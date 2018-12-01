# Spring之旅

- Spring的bean容器
- 介绍Spring的核心模块
- 更为强大的Spring生态系统
- Spring的新功能

## 简化Java开发
Spring是为了解决企业级应用开发的复杂性而创建的，使用Spring可以让简单的JavaBean实现之前只有EJB才能完成的事
情。   
为了降低Java开发的复杂性，Spring采取了以下4种关键策略：
- 基于POJO的轻量级和最小侵入性编程；
- 通过依赖注入和面向接口实现松耦合；
- 基于切面和惯例进行声明式编程；
- 通过切面和模板减少样板式代码

### 激发POJO的潜能

如果你从事Java编程有一段时间了，那么你或许会发现（可能你也实际使用过）很多框架通过强迫应用继承它们的类或实现它们的接口从而导致应用与框架绑死。一个典型的例子是EJB 2时代的无状态会话bean。早期的EJB是一个很容易想到的例子，不过这种侵入式的编程方式在早期版本的Struts、WebWork、Tapestry以及无数其他的Java规范和框架中都能看到。   
Spring竭力避免因自身的API而弄乱你的应用代码。Spring不会强迫你实现Spring规范的接口或继承Spring规范的类，相反，在基于Spring构建的应用中，它的类通常没有任何痕迹表明你使用了Spring。最坏的场景是，一个类或许会使用Spring注解，但它依旧是POJO   
Spring不会在HelloWorldBean上有任何不合理的要求.可以看到，这是一个简单普通的Java类——POJO。没有任何地方表明它是一个Spring组件。    
Spring的非侵入编程模型意味着这个类在Spring应用和非Spring应用中都可以发挥同样的作用。尽管形式看起来很简单，但POJO一样可以具有魔力。    
Spring赋予POJO魔力的方式之一就是通过DI来装配它们。让我们看看DI是如何帮助应用对象彼此之间保持松散耦合

### 依赖注入
- 实现依赖注入
构造器注入,在构造的时候把创建好的实例对象作为构造器参数传入。
- 装配
    + 创建应用组件之间协作的行为通常称为装配（wiring）。Spring有多种装配bean的方式，采用XML
        是很常见的一种装配方式。程序清单1.6展现了一个简单的Spring配置文件：knights.xml，该配置文
        件将BraveKnight、SlayDragonQuest和PrintStream装配到了一起。
        <bean id="knight" class="sia.knights.BraveKnight">
            <constructor-arg ref="quest" />
        </bean>

        <bean id="quest" class="sia.knights.SlayDragonQuest">
            <constructor-arg value="#{T(System).out}" />
        </bean>
        //  SlayDragonQuest bean的声明使用了Spring表达式语言（Spring Expression
            Language），将System.out（这是一个PrintStream）传入到了SlayDragonQuest的构造
            器中。
    + 基于Java的配置
        @Configuration
        public class KnightConfig {

            @Bean
            public Knight knight() {
                return new BraveKnight(quest());
            }
            
            @Bean
            public Quest quest() {
                return new SlayDragonQuest(System.out);
            }
        }

- 使用Bean
        import org.springframework.context.support.
                    ClassPathXmlApplicationContext;

        public class KnightMain {

            public static void main(String[] args) throws Exception {
                ClassPathXmlApplicationContext context = 
                    new ClassPathXmlApplicationContext(
                        "META-INF/spring/knight.xml");
                Knight knight = context.getBean(Knight.class);
                knight.embarkOnQuest();
                context.close();
            }
        }
加载上下文，并在上下文中获取Bean


这里的main()方法基于knights.xml文件创建了Spring应用上下文。随后它调用该应用上下文获取
一个ID为knight的bean。得到Knight对象的引用后，只需简单调用embarkOnQuest()方法就可
以执行所赋予的探险任务了。注意这个类完全不知道我们的英雄骑士接受哪种探险任务，而且完全
没有意识到这是由BraveKnight来执行的。只有knights.xml文件知道哪个骑士执行哪种探险任
务。
### 应用切面
DI能够让相互协作的软件组件保持松散耦合，而面向切面编程（aspect-oriented
programming，AOP）允许你把遍布应用各处的功能分离出来形成可重用的组件。
我们可以把切面想象为覆盖在很多组件之上的一个外壳。应用是由那些实现各自业
务功能的模块组成的。借助AOP，可以使用各种功能层去包裹核心业务层。这些层以声明的方式
灵活地应用到系统中，你的核心应用甚至根本不知道它们的存在。这是一个非常强大的理念，可以
将安全、事务和日志关注点与核心业务逻辑相分离。

        <bean id="knight" class="sia.knights.BraveKnight">
            <constructor-arg ref="quest" />
        </bean>

        <bean id="quest" class="sia.knights.SlayDragonQuest">
            <constructor-arg value="#{T(System).out}" />
        </bean>

        <bean id="minstrel" class="sia.knights.Minstrel">
            <constructor-arg value="#{T(System).out}" />
        </bean>

        <aop:config>
            <aop:aspect ref="minstrel">
            //定义切点
                <aop:pointcut id="embark"
                    expression="execution(* *.embarkOnQuest(..))"/>
            //声明前置通知
                <aop:before pointcut-ref="embark" 
                    method="singBeforeQuest"/>
            //声明后置通知
                <aop:after pointcut-ref="embark" 
                    method="singAfterQuest"/>
            </aop:aspect>
        </aop:config>

### 使用模板消除样板式代码
使用Spring的JdbcTemplate

## 容纳你的Bean（Spring容器）
- Bean工厂
- 应用上下文

### 使用应用上下文
- AnnotationConfigApplicationContext：从一个或多个基于Java的配置类中加载Spring应用上下文。
- AnnotationConfigWebApplicationContext：从一个或多个基于Java的配置类中加载Spring Web应用上下文。
- ClassPathXmlApplicationContext：从类路径下的一个或多个XML配置文件中加载上下文定义，把应用上下文的定义文件作为类资源。
- FileSystemXmlapplicationcontext：从文件系统下的一个或多个XML配置文件中加载上下文定义。
- XmlWebApplicationContext：从Web应用下的一个或多个XML配置文件中加载上下文定义。

### Bean的生命周期
在传统的Java应用中，bean的生命周期很简单。使用Java关键字new进行bean实例化，然后该
bean就可以使用了。一旦该bean不再被使用，则由Java自动进行垃圾回收   

相比之下，Spring容器中的bean的生命周期就显得相对复杂多了
1．Spring对bean进行实例化；
2．Spring将值和bean的引用注入到bean对应的属性中；
3．如果bean实现了BeanNameAware接口，Spring将bean的ID传递给setBean-Name()方法；
4．如果bean实现了BeanFactoryAware接口，Spring将调用setBeanFactory()方法，将
BeanFactory容器实例传入；
5．如果bean实现了ApplicationContextAware接口，Spring将调
用setApplicationContext()方法，将bean所在的应用上下文的引用传入进来；
6．如果bean实现了BeanPostProcessor接口，Spring将调用它们的postProcessBeforeInitialization()方法；
7．如果bean实现了InitializingBean接口，Spring将调用它们的afterPropertiesSet()方法。类似地，如果bean使用init-method声明了初始化方法，该方法也
会被调用；
8．如果bean实现了BeanPostProcessor接口，Spring将调用它们的postProcessAfterInitialization()方法；
9．此时，bean已经准备就绪，可以被应用程序使用了，它们将一直驻留在应用上下文中，直到该
应用上下文被销毁；
10．如果bean实现了DisposableBean接口，Spring将调用它的destroy()接口方法。同样，
如果bean使用destroy-method声明了销毁方法，该方法也会被调用。

## 俯瞰Spring风景线

### Spring模块
- Spring核心容器
容器是Spring框架最核心的部分，它管理着Spring应用中bean的创建、配置和管理。   
在该模块中，包括了Spring bean工厂，它为Spring提供了DI的功能。基于bean工厂，我们还会发现有多种
Spring应用上下文的实现，每一种都提供了配置Spring的不同方式。
- Spring的AOP模块
在AOP模块中，Spring对面向切面编程提供了丰富的支持。这
- 数据访问与集成
- Web与远程调用
- Instrumentation
- 测试
### Spring Portfolio
- Spring Web Flow
- Spring Web Service
- Spring Security
- Spring Integration
- Spring Batch
- Spring Data
- Spring Social
- Spring Mobile
- Spring for Android
- Spring Boot

## Spring的新功能
各版本的新特性

## 小结
Spring 使用依赖注入DI和面向切面编程AOP来实现松散耦合，简化开发。

