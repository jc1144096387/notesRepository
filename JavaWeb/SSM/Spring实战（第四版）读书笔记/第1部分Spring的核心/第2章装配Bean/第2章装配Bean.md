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


### 创建可被发现的Bean
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

### 为组件扫描的Bean命名
Spring应用上下文中所有的bean都会给定一个ID。在前面的例子中，尽管我们没有明确地
为SgtPeppersbean设置ID，但Spring会根据类名为其指定一个ID。具体来讲，这个bean所给定
的ID为sgtPeppers，也就是将类名的第一个字母变为小写。
如果想为这个bean设置不同的ID，你所要做的就是将期望的ID作为值传递给@Component注解。
比如说，如果想将这个bean标识为lonelyHeartsClub，那么你需要将SgtPeppers类
的@Component注解配置为如下所示：
@Component("lonelyHeartsClub")

### 设置组件扫描的基础包
为@ComponentScan设置basePackages属属性

### 通过为bean添加注解实现自动装配
为了声明要进行自动装配，我们可以借助Spring的@Autowired注解

## 通过Java代码装配Bean
### 创建配置类
创建JavaConfig类的关键在于为其添加@Configuration注解，@Configuration注解表明这
个类是一个配置类，该类应该包含在Spring应用上下文中如何创建bean的细节
### 声明简单的bean
要在JavaConfig中声明bean，我们需要编写一个方法，这个方法会创建所需类型的实例，然后给
这个方法添加@Bean注解。比方说，下面的代码声明了CompactDisc bean：

@Bean注解会告诉Spring这个方法将会返回一个对象，该对象要注册为Spring应用上下文中的
bean。方法体中包含了最终产生bean实例的逻辑。

### 借助JavaConfig实现注入
- 在JavaConfig中装配bean的最简单方式就是引用创建bean的方法
- cdPlayer()方法请求一个CompactDisc作为参数。当Spring调用cdPlayer()创
建CDPlayerbean的时候，它会自动装配一个CompactDisc到配置方法之中。

## 通过XML装配Bean
### 创建XML配置规范

## 导入和混合配置
## 小结
在本章中，我们看到了在Spring中装配bean的三种主要方式：自动化配置、基于Java的显式配置
以及基于XML的显式配置。    
我同时建议尽可能使用自动化配置，以避免显式配置所带来的维护成本。但是，如果你确实需要显
式配置Spring的话，应该优先选择基于Java的配置，它比基于XML的配置更加强大、类型安全并且
易于重构