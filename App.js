import React, {
  useRef,
  useReducer,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  useState
} from "react";


function UseRefExample() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="p-4 space-y-2">
      <input ref={inputRef} type="text" placeholder="Digite algo..." className="border p-2" />
      <button onClick={focusInput} className="bg-blue-500 text-white px-4 py-2 rounded">
        Focar
      </button>
    </div>
  );
}


const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-4 space-x-2">
      <span>Contador: {state.count}</span>
      <button onClick={() => dispatch({ type: "increment" })} className="bg-green-500 text-white px-4 py-2 rounded">+</button>
      <button onClick={() => dispatch({ type: "decrement" })} className="bg-red-500 text-white px-4 py-2 rounded">-</button>
    </div>
  );
}


function UseLayoutEffectExample() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (box) {
      setWidth(box.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className="p-4">
      <div ref={boxRef} className="bg-blue-300 p-4 w-64">Caixa</div>
      <p>Largura da caixa: {width}px</p>
    </div>
  );
}


const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => (inputRef.current.value = ""),
  }));

  return <input ref={inputRef} className="border p-2" placeholder="Campo controlado por ref" />;
});

function UseImperativeHandleExample() {
  const inputRef = useRef();

  return (
    <div className="p-4 space-y-2">
      <CustomInput ref={inputRef} />
      <div className="space-x-2">
        <button onClick={() => inputRef.current.focus()} className="bg-blue-500 text-white px-4 py-2 rounded">Focar</button>
        <button onClick={() => inputRef.current.clear()} className="bg-red-500 text-white px-4 py-2 rounded">Limpar</button>
      </div>
    </div>
  );
}


export default function App() {
  const [selectedExample, setSelectedExample] = useState("useRef");

  const renderExample = () => {
    switch (selectedExample) {
      case "useRef": return <UseRefExample />;
      case "useReducer": return <UseReducerExample />;
      case "useLayoutEffect": return <UseLayoutEffectExample />;
      case "useImperativeHandle": return <UseImperativeHandleExample />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Exemplos de React Hooks</h1>
      <div className="space-x-2">
        <button onClick={() => setSelectedExample("useRef")} className="bg-gray-800 text-white px-4 py-2 rounded">useRef</button>
        <button onClick={() => setSelectedExample("useReducer")} className="bg-gray-800 text-white px-4 py-2 rounded">useReducer</button>
        <button onClick={() => setSelectedExample("useLayoutEffect")} className="bg-gray-800 text-white px-4 py-2 rounded">useLayoutEffect</button>
        <button onClick={() => setSelectedExample("useImperativeHandle")} className="bg-gray-800 text-white px-4 py-2 rounded">useImperativeHandle</button>
      </div>
      <div className="border p-4 rounded-xl shadow-xl bg-white">{renderExample()}</div>
    </div>
  );
}