# 装配Bean

- 声明Bean
- 构造器注入和Setter方法注入
- 装配Bean
- 控制Bean的创建和销毁
## Spring配置的可选方案
- 在XML中进行显式配置。
- 在Java中进行显式配置。
- 隐式的bean发现机制和自动装配。

即便如此，我的建议是尽可能地使用自动配置的机制。显式配置越少越好。当你必须要显式配置
bean的时候（比如，有些源码不是由你来维护的，而当你需要为这些代码配置bean的时候），我
推荐使用类型安全并且比XML更加强大的JavaConfig。最后，只有当你想要使用便利的XML命名
空间，并且在JavaConfig中没有同样的实现时，才应该使用XML。

## 自动化装配Bean
Spring从两个角度来实现自动化装配：
- 组件扫描（component scanning）：Spring会自动发现应用上下文中所创建的bean。
- 自动装配（autowiring）：Spring自动满足bean之间的依赖。

你需要注意的就
是SgtPeppers类上使用了@Component注解。这个简单的注解表明该类会作为组件类，并告知
Spring要为这个类创建bean。没有必要显式配置SgtPeppersbean，因为这个类使用
了@Component注解，所以Spring会为你把事情处理妥当。

不过，组件扫描默认是不启用的。我们还需要显式配置一下Spring，从而命令它去寻找带
有@Component注解的类，并为其创建bean。

- java配置类启用组件扫描
程序清单2.3的 配置类 展现了完成这项任务的最简洁配置
如果没有其他配置的话，@ComponentScan默认会扫描与配置类相同的包。因
为CDPlayerConfig类位于soundsystem包中，因此Spring将会扫描这个包以及这个包下的所
有子包，查找带有@Component注解的类。这样的话，就能发现CompactDisc，并且会在Spring
中自动为其创建一个bean。
- xml启用组件扫描
如果你更倾向于使用XML来启用组件扫描的话，那么可以使用Spring context命名空间
的<context:component-scan>元素。
## 通过Java代码装配Bean
## 通过XML装配Bean
## 导入和混合配置
## 小结