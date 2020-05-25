![](https://upload-images.jianshu.io/upload_images/2979799-af0c75ef1b34472f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

刚学了一下 React Hooks 的用法，就写篇博客记录一下。因为学得也比较浅，所以这篇博客只讲怎么用。

代码放在这里了：[https://github.com/Haixiang6123/learn-react-hooks](https://github.com/Haixiang6123/learn-react-hooks) 。看对应的 LearnXXX.tsx 就可以了。

例子在这里：[https://yanhaixiang.com/learn-react-hooks](https://yanhaixiang.com/learn-react-hooks)

## useState
### 普通用法
就是用来管理组件的内部状态。
```tsx
const UseState: React.FC = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(100)

  const onClickX = () => setX(x + 1)
  const onClickY = () => setY((prevX) => prevX + 1)

  return (
    <div>
      <h1>useState</h1>
      <button onClick={onClickX}>x + 1</button>
      <p>x: {x}</p>

      <button onClick={onClickY}>y + 1</button>
      <p>y: {y}</p>
    </div>
  )
}
```
这里注意，x 是直接通过 setX 去改变的，而 y 是传入一个函数（操作）去改变。传入函数去改变的一个好处就是可以**连续多次**改变 y 值，而 setX 只会执行最后一次的 setX。

### 改变对象

对于改变对象一定不能只改变其中的属性，而是整个对象都要改。
```
const [obj, setObj] = useState({name: 'Jack', age: 18})

// 错误
obj.age = 19
setObj(obj)

// 正确
setObj({
  ...obj,
  age: 19
})
```

### 复杂计算
如果初始值需要复杂计算，则可以在 useState 直接传入一个 factory 函数，而不是默认值。

```tsx
const [onlyRunAtFirstTime, change] = useState(() => {
  console.log('只在第一次渲染时执行，这里可以假设 9 + 9 是一些复杂的操作')

  return {name: 'Jack', age: 9 + 9}
})
```

## useReducer
useReducer 可以看成复杂版的 useState，或者理解成 Redux 里的 reducer，再或者理解成 Vuex。返回值依然是一个数组，第一项是读，第二项是写。
```tsx
const initState: TState = {
  name: 'Jack',
  age: 18
}

const reducer = (state: TState, action: TAction) => {
  const {type} = action

  switch (type) {
    case 'addAge':
      return {...state, age: state.age + 1}
    case 'minusAge':
      return {...state, age: state.age - 1}
    case 'update':
      return {...state, ...action.user}
    default:
      throw new Error('没有传入 type')
  }
}

const LearnUseReducer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const onAdd = () => dispatch({type: 'addAge'})
  const onMinus = () => dispatch({type: 'minusAge'})
  const onUpdate = () => dispatch({type: 'update', user: {name: 'Tom', age: 20}})

  return (
    <div>
      <h1>useReducer</h1>
      <button onClick={onAdd}>age + 1</button>
      <button onClick={onMinus}>age - 1</button>
      <button onClick={onUpdate}>更新整个user</button>
      <p>{JSON.stringify(state)}</p>
    </div>
  )
}

```

**这里要注意的是，reducer 是第一个参数，initState 是第二个参数，非常奇怪的传参逻辑。**

## useContext
## 普通用法

这个 Hook 的意义就是造一些局部变量，在这个局部下的组件都能访问到这些变量。

一般可以配合上面的 useReducer 去代替 Redux，或者在 styled-components 里可直接使用主题色。

```tsx
const initTheme = {
  success: 'green'
}

const Context = createContext<TTheme | null>(null)

const LearnUseContext: React.FC = () => {
  const [theme] = useState(initTheme)

  return (
    <Context.Provider value={theme}>
      <div>
        爸爸得到的值: {theme.success}
        <Child/>
      </div>
    </Context.Provider>
  )
}

const Child: React.FC = () => {
  const theme = useContext(Context)

  return (
    <div>
      儿子得到的值: {theme!.success}
      <GrandChild/>
    </div>
  )
}

const GrandChild: React.FC = () => {
  const theme = useContext(Context)

  return (
    <div>孙子得到的值: {theme?.success}</div>
  )
}
```

上面的例子可以看到，在外面定义好的主题色，通过 Context.Provider 传递到下面的所有组件。当然也可以再传个 setTheme 函数，让儿子、孙子组件去修改 theme。

### 代替 Redux

那怎么去代替 Redux 呢？很简单，把上面的讲的 `reducer`，`state` 提到 App，然后，通过 Context.Provider 传到下面所有组件就好了。

```tsx
const initState = {/*初始状态*/}
const reducer = () => {/*你的 reducer*/}

const App: React.FC = () => {
  const [store, dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={{store, dispatch}}>
      <div>各种组件</div>
    </Context.Provider>
  )
}
```

## useEffect

useEffect 一般是去代替 componentDidMount, componentDidUpdate 和 componentWillUnmount。**简单来讲，就是活了，变了，死了的时候要干啥。**

下面先给个例子。

```tsx
const LearnUseEffect: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => { // 对应 componentDidMount
    console.log('刚开始就执行，要在这里去获取 movies')

    ajax('movies', (newMovies: any[]) => setMovies(newMovies))
  }, [])
  useEffect(() => { // 对应 componentDidUpdate
    console.log('只要有东西更新了，我就执行')
  })
  useEffect(() => { // 对应 componentDidUpdate，但是只有 movies 更新才执行
    console.log('movies 更新了，所以我执行了')
  }, [movies])

  return (
    <div>
      <h1>useEffect</h1>
      {
        movies.length === 0 ?
          <div>加载中</div> :
          <ul>
            {movies.map(m => <li key={m.id}>{m.name}</li>)}
          </ul>
      }
    </div>
  )
}
```

执行后可以看到

![](https://upload-images.jianshu.io/upload_images/2979799-11a105e09f4c4c52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

为什么会有两次的 “只要有东西...” 和 “movies 更新了..” 呢？是因为第一次是使用了 `useState` 将 `movies` 从 `null` 变成了 `[]`，第二次才是发 ajax 去请求数据。

关于替换 componentWillUnmount，只需要返回一个函数就可以了。

```tsx
useEffect(() => { // 对应 componentDidMount
  console.log('刚开始就执行，要在这里去获取 movies')

  ajax('movies', (newMovies: any[]) => setMovies(newMovies))
  
  return () => {
    console.log('这个组件就要死翘翘了')
  }
}, [])
```

**注意，这里可以同时使用多个 `useEffect`，执行顺序就是按代码的顺序。**

## useLayoutEffect
`useEffect` 和 `useLayoutEffect` 是差不多的东西，区别是执行时机不一样。这个 Hook 是在渲染之前，先去执行一些东西，然后再去渲染。而 `useEffect` 就是在渲染之后，才去执行函数。也就是说：

1. App() 执行
2. 生成虚拟 DOM
3. 变成真实 DOM
4. **执行 useLayoutEffect 回调**
5. 渲染 render
6. **执行 useEffect 回调**

这样的好处就是如果你有下面的代码：
```tsx
useEffect(() => {
  document.querySelector('#xxx').textContent = Math.random()
})
```

你会看到页面的闪烁，本来是 0 变成了 随机数。

![](https://upload-images.jianshu.io/upload_images/2979799-650cf6cfe7bc1f45.gif?imageMogr2/auto-orient/strip)

而如果用 `useLayoutEffect` 就不会出现上面的情况，因为还渲染，已经改成了随机数了。

![](https://upload-images.jianshu.io/upload_images/2979799-75ec4b469d7e7c84.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

既然不会闪烁，那是不是都用 `useLayoutEffect` 好呢？其实不是，因为如果把所有的操作都放在渲染之前，用户一打开网页就会是一片白，等数据来了或者计算结束了，页面才渲染。这会严重影响用户体验。

**大部分情况下应该是使用 `useEffect`，在获取数据或者大量计算时候显示一个 Loading 菊花就好了。**

## useMemo

在写 React 的时候，我们经常会有这种场景，App 下有一个 Child 组件：<App> -> <Child>。当改变了 App 组件的变量时，Child 会再次执行。

```tsx
const LearnUseMemo: React.FC = () => {
  const [x, setX] = useState(0)

  const onClickX = () => setX(x + 1)

  return (
    <div>
      <h1>useMemo</h1>
      <button onClick={onClickX}>x + 1</button>
      <Child/>
    </div>
  )
}

const Child: React.FC = () => {
  console.log('我是儿子，为什么要搞我')

  return <div>儿子</div>
}
```
像这个例子，点一下  x + 1 按钮，x 的值变了，但是依然会打出“我是儿子，别搞我”。

这里就有问题了：改变的是 App 的东西，又不是 Child 的东西，Child 怎么还要执行呢？useMemo 就是来解决这个问题的。

### 什么是 memo

这里有个解决方法就是用 `React.memo`，将 Child 组件传入会得到一个组件，这个新的组件只有在 props 变了才会再次执行。

```tsx
const Child2 = React.memo(Child)
```

然后

```tsx
return (
    <div>
      <h1>useMemo</h1>
      <button onClick={onClickX}>x + 1</button>
      <Child2/>
    </div>
)
```
这样就不会打出“我是儿子，为什么要搞我”。**但是**，这里还是有问题，假如 Child 的 props 要传入一个函数，那么 props 就有可能发生变化：

```tsx
const LearnUseMemo: React.FC = () => {
  const [x, setX] = useState(0)

  const onClickX = () => setX(x + 1)

  const onChild3Click = () => {}

  return (
    <div>
      <button onClick={onClickX}>x + 1</button>
      <Child3 onChild3Click={onChild3Click}/>
    </div>
  )
}

const Child3 = React.memo((props: any) => {
  console.log('我是儿子3，用了 memo 还能搞到我？')

  return <div onClick={props.onChild3Click}>我是儿子3，用了 memo 还能搞到我？</div>
})
```

这里点击了 x + 1 按钮，还是会打出 “我是儿子3，用了 memo 还能搞到我”，因为在执行 LearnUseMemo 的时候， onChild3Click 已经换成另一个函数了（虽然函数体是一样的，但是函数是对象，对象地址变了），所以 props 会变，props 一变，就会执行 Child3。

### 最后的 useMemo
为了解决上面的问题，终于引出我们的 useMemo 了。useMemo 可以缓存一切东西，比如上面的函数：

```tsx
const onMemoClick = useMemo(() => {
  return () => console.log("点击了")
}, [])
```

然后再把这个 onMemoClick 传给 Child3 就OK了！第二个参数是监听的依赖，只有依赖变了，才会更新，和 useEffect 是差不多的。

为了更简洁，我们还可以使用 useCallback，就不用像上面那样疯狂俄罗斯套娃了。

```tsx
const onMemoClick = useCallback(() => {
  console.log('点击了')
}, [])
```

## useRef

## 普通用法
使用 useSate 的时候，值是每次都会变，那我希望每次更新值不要变
useRef 的使用场景是如果你需要一个值，在组件不断 render 时保持不变。。useRef 会将值存在一个地方，与当前组件一一对应。例子：

```tsx
const LearnUseRef: React.FC = () => {
  const [x, setX] = useState(0)
  const y = useRef(0)

  useEffect(() => {
    y.current += 1
  }, [])

  const changeX = () => setX(x + 1)
  const changeY = () => y.current += 1

  return (
    <div>
      <h1>useRef</h1>
      <button onClick={changeX}>x + 1</button>
      <button onClick={changeY}>y + 1</button>
      <div>x 的值 {x}</div>
      <div>y 的值 {y.current}</div>
    </div>
  )
}
```

但是这里有个问题，就是在 `useEffect` 的时候改变了 y 的值，页面显示还是0.

![](https://upload-images.jianshu.io/upload_images/2979799-f062a0ff9fe1907f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是因为改变了 y.current 的值后，React 并不会帮你更新页面。只有，如 setX 被执行导致页面更新才会更新 y 的值，所以很蛋疼。不过，如果你非要实现点击然后加一这个功能，那就不如用 useState 好了。

### forwardRef
之前用过 React 和 Vue 的同学应该知道，我们可以用 ref 去代替 `document.querySelect` 来获取某个元素。forwardRef 是用来传递 ref 这个 props 的。

```tsx
const LearnUseRef: React.FC = () => {
  const myButton = useRef(null)
  return (
    <div>
      ...
      <Button ref={myButton}/>
    </div>
  )
}

const Button = (props: any) => {
  return <button ref={props.ref}>用作 ref 的按钮</button>
}
```

这里我们想获取 Button 组件里的 button 元素，所以我们想从 LearnUseRef 组件传一个 ref 到 Button，好让 Button 去引用到 button 元素。但是报错：

![](https://upload-images.jianshu.io/upload_images/2979799-75d604ffe22065ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因为 ref 本来就用作引用某个元素的，但是你是想传一个叫 "ref" 的 props，这不就冲突了嘛，所以报错。这里已经提示我们要用 forwardRef 了，所以应该是这么用的：

```tsx
const LearnUseRef: React.FC = () => {
  const myButton = useRef(null)
  return (
    <div>
      ...
      <OKButton ref={myButton}/>
    </div>
  )
}

const Button = (props: any) => {
  return <button ref={props.ref}>用作 ref 的按钮</button>
}

const OKButton = React.forwardRef(Button)
```
## useImperativeHandle
这个 Hook 其实的意思就是 `setRef`，怎么理解呢？回看上面的例子，我们传了一个 ref 给 OKButton 组件，那万一 OKButton 组件想修改这个 ref 怎么办呢？这就需要 `useImperativeHandle` 了。

```tsx
const LearnUseImperativeHandle: React.FC = () => {
  const myButton = useRef(null)

  useEffect(() => {
    console.log('有人改了我的 ref', myButton)
  })

  return (
    <div>
      <OKButton ref={myButton}/>
    </div>
  )
}

const OKButton = React.forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => {
    return {
      x: 'hello'
    }
  })
  return <button>按钮</button>
})
```

打开控制台，可以看到

![](https://upload-images.jianshu.io/upload_images/2979799-a68eeb36add28773.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里的 current 就变成了 `{x: 'hello'}` 了。用处嘛，我也没想到有什么用。。。

## 自定义 Hook

这个其实说到底就是一种封装的方法。比如，我们有 books 这个资源，RESTful API 有

1. get /books
2. post /books?id=xxx
3. delete /books?id=xxx
4. put /books?id=xxx

那么我们代码可能就有4个函数去发这4个请求：

```tsx
const getBooks = () => {/* get /books */}
const addBooks = () => {/* post /books?id=xxx */}
const editBooks = () => {/* put /books?id=xxx */}
const deleteBooks = () => {/* delete /books?id=xxx */}
```

最好我们有个东西可以把上面的东西放在一起，然后在对应的组件调用一下就好了，这其实就是自定义 Hooks。

```tsx
const useBooks = (initBooks: TBook[]) => {
  const [books, setBooks] = useState(initBooks)

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = () => {
    setTimeout(() => {
      setBooks([
        {id: '1', name: '一体'},
        {id: '2', name: '二体'},
        {id: '3', name: '三体'},
        {id: '4', name: '裸体'},
      ])
    }, 2000)
  }
  const addBooks = (newBook: TBook) => {
    setBooks([...books, newBook])
  }
  const editBooks = () => {/* put /books?id=xxx */}
  const deleteBooks = () => {/* delete /books?id=xxx */}

  return {
    books,
    getBooks,
    addBooks,
    editBooks,
    deleteBooks
  }
}

const LearnCustomizeHook: React.FC = () => {
  const {books} = useBooks([])

  return (
    <div>
      <h1>useBooks</h1>
      {
        books.length === 0?
          <div>加载中</div> :
          <ul>
            {
              books.map(b => <li key={b.id}>{b.name}</li>)
            }
          </ul>
      }
    </div>
  )
}
```

可以看到，用了自定义 Hooks 会让代码变得清爽很多。

（完）
