---
title: ECS Compnent - ISystemStateComponentData
tags: []
id: '712'
categories:
  - - 未分类
date: 2020-05-31 17:20:53
---

[System State Components](https://docs.unity3d.com/Packages/com.unity.entities@0.11/manual/system_state_components.html)

[ECS框架文档翻译六 System State Components\_Andrew的游戏世界-CSDN博客](https://blog.csdn.net/AndrewFan/article/details/90479748)

**`系统状态组件`** 的行为类似于普通组件或共享组件，但在销毁实体时，EntityManager不会删除任何系统状态组件，也不会回收实体ID，直到系统状态组件被删除。 这种行为差异允许系统在销毁实体时清理其内部状态或释放资源。

**当实体被销毁时，SystemStateComponentData不会被立刻销毁**

1.  查找引用此实体ID的所有组件
2.  删除这些组件
3.  回收实体ID以供重新使用 然而，与实体ID关联的组件中，如果存在SystemStateComponentData，则不会立刻将此实体删除。这将使得系统（System）有机会来删除与实体ID相关联的资源或状态。只有在删除所有SystemStateComponentData后，此实体ID才会得到重用。

## Example system using state components

The following example shows a simplified system that illustrates（说明了） how to manage entities with system state components. The example defines a `general-purpose IComponentData instance` and a system state, `ISystemStateComponentData` instance. It also defines three queries based on those entities:

*   `m_newEntities` selects entities that have the general-purpose, but not the system state component（挑选那些有\*\*\*general-purpose\*\*\*但不包含\*\*\*系统状态组件\*\*\*的Entities）. This query finds new entities that the system has not seen before. **The system runs a job using the new entities query that adds the system state component**.
*   `m_activeEntities` selects entities that have both the general-purpose and the system state component（挑选那些既有\*\*\*general-purpose\*\*\*和\*\*\*系统状态组件\*\*\*的Entities）. In a real application, other systems might be the ones that process or destroy the entities.
*   `m_destroyedEntities` selects entities that have the system state, but not the general-purpose component. Since the system state component is never added to an entity by itself, the entities that this query selects must have been deleted, either by this system or another system. The system reuses the destroyed entities query to run a job and remove the system state component from the entities, which allows the ECS code to recycle the entity identifier.

This simplified example does not maintain any state within the system. One purpose for system state components is to track when persistent resources need to be allocated or cleaned up.（这个简单的例子不维护系统内的任何状态。系统状态组件的一个目的是追踪需要`分配`或`清理`的资源）

```
using Unity.Collections;
using Unity.Entities;
using Unity.Jobs;
using UnityEngine;

public struct GeneralPurposeComponentA : IComponentData
{
    public bool IsAlive;
}

public struct StateComponentB : ISystemStateComponentData
{
    public int State;
}

public class StatefulSystem : JobComponentSystem
{
    private EntityQuery m_newEntities;
    private EntityQuery m_activeEntities;
    private EntityQuery m_destroyedEntities;
    private EntityCommandBufferSystem m_ECBSource;

    protected override void OnCreate()
    {
        // Entities with GeneralPurposeComponentA but not StateComponentB
        m_newEntities = GetEntityQuery(new EntityQueryDesc()
        {
            All = new ComponentType[] {ComponentType.ReadOnly<GeneralPurposeComponentA>()},
            None = new ComponentType[] {ComponentType.ReadWrite<StateComponentB>()}
        });
    
        // Entities with both GeneralPurposeComponentA and StateComponentB
        m_activeEntities = GetEntityQuery(new EntityQueryDesc()
        {
            All = new ComponentType[]
            {
                ComponentType.ReadWrite<GeneralPurposeComponentA>(),
                ComponentType.ReadOnly<StateComponentB>()
            }
        });
    
        // Entities with StateComponentB but not GeneralPurposeComponentA
        m_destroyedEntities = GetEntityQuery(new EntityQueryDesc()
        {
            All = new ComponentType[] {ComponentType.ReadWrite<StateComponentB>()},
            None = new ComponentType[] {ComponentType.ReadOnly<GeneralPurposeComponentA>()}
        });
    
        m_ECBSource = World.GetOrCreateSystem<EndSimulationEntityCommandBufferSystem>();
    }

#pragma warning disable 618
    struct NewEntityJob : IJobForEachWithEntity<GeneralPurposeComponentA>
    {
        public EntityCommandBuffer.Concurrent ConcurrentECB;

        public void Execute(Entity entity, int jobIndex, [ReadOnly] ref GeneralPurposeComponentA gpA)
        {
            // Add an ISystemStateComponentData instance
            ConcurrentECB.AddComponent<StateComponentB>(jobIndex, entity, new StateComponentB() {State = 1});
        }
    }
    
    struct ProcessEntityJob : IJobForEachWithEntity<GeneralPurposeComponentA>
    {
        public EntityCommandBuffer.Concurrent ConcurrentECB;
    
        public void Execute(Entity entity, int jobIndex, ref GeneralPurposeComponentA gpA)
        {
            // Process entity, possibly setting IsAlive false --
            // In which case, destroy the entity
            if (!gpA.IsAlive)
            {
                ConcurrentECB.DestroyEntity(jobIndex, entity);
            }
        }
    }
    
    struct CleanupEntityJob : IJobForEachWithEntity<StateComponentB>
    {
        public EntityCommandBuffer.Concurrent ConcurrentECB;
    
        public void Execute(Entity entity, int jobIndex, [ReadOnly] ref StateComponentB state)
        {
            // This system is responsible for removing any ISystemStateComponentData instances it adds
            // Otherwise, the entity is never truly destroyed.
            ConcurrentECB.RemoveComponent<StateComponentB>(jobIndex, entity);
        }
    }
#pragma warning restore 618

    protected override JobHandle OnUpdate(JobHandle inputDependencies)
    {
        var newEntityJob = new NewEntityJob()
        {
            ConcurrentECB = m_ECBSource.CreateCommandBuffer().ToConcurrent()
        };
        var newJobHandle = newEntityJob.ScheduleSingle(m_newEntities, inputDependencies);
        m_ECBSource.AddJobHandleForProducer(newJobHandle);
    
        var processEntityJob = new ProcessEntityJob()
        {ConcurrentECB = m_ECBSource.CreateCommandBuffer().ToConcurrent()};
        var processJobHandle = processEntityJob.Schedule(m_activeEntities, newJobHandle);
        m_ECBSource.AddJobHandleForProducer(processJobHandle);
    
        var cleanupEntityJob = new CleanupEntityJob()
        {
            ConcurrentECB = m_ECBSource.CreateCommandBuffer().ToConcurrent()
        };
        var cleanupJobHandle = cleanupEntityJob.ScheduleSingle(m_destroyedEntities, processJobHandle);
        m_ECBSource.AddJobHandleForProducer(cleanupJobHandle);
    
        return cleanupJobHandle;
    }
    
    protected override void OnDestroy()
    {
        // Implement OnDestroy to cleanup any resources allocated by this system.
        // (This simplified example does not allocate any resources.)
    }
}

```