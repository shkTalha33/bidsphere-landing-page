const Counter = ({ count, setCount, disabled, incrementFunc, decrementFunc }) => {
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 1 ? count - 1 : 1);

    return (
        <div className="flex items-center mb-1 gap-1">
            <button
                onClick={() => {
                    if (decrementFunc) {
                        decrementFunc()
                    } else
                        decrement()
                }}
                className="btn1 primary small-btn-2"
            >
                -
            </button>
            <span className="text-sm btn1 outline-primary small-btn-2">{count}</span>
            <button
                disabled={disabled}
                onClick={() => {
                    if (incrementFunc) {
                        incrementFunc()
                    } else
                        increment()
                }}
                className="btn1 primary small-btn-2"
            >
                +
            </button>
        </div>
    );
};

export default Counter;