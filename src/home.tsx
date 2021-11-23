import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./store";
const Home: FC = () => {
  return (
    <main>
      <Title />
      <Form />
      <Cheat />
      <Transactions />
      <Blocks />
    </main>
  );
};

const Title: FC = observer(() => {
  const store = useStore();
  return <h1>一共有{store.numberBlocks} 个区块  {store.valid?'没被篡改':'被篡改了'} </h1>;
});

const Cheat:FC=observer(()=>{
    const store=useStore();
    return <div>
       {store.blocks.length>0 && (<>
        <button onClick={()=>{
            store.blocks[store.blocks.length-1].hash='3333'
        }}>篡改最后一个区块hash</button>

        <button onClick={()=>{
            store.blocks[store.blocks.length-1].transactions[0]='wwwww'
        }}>篡改最后一个区块的第一笔交易</button></>)}
    </div>
})

const Form: FC = () => {
  const store = useStore();
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addTransaction(message);
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="message"
        required
        aria-required
      />
      <button type="submit">添加交易</button>
    </form>
  );
};

const Transactions: FC = observer(() => {
  const store = useStore();
  return store.transactions.length > 0 ? (
    <div>
      <h2>延迟处理的交易（每10秒写入一次区块)</h2>
      <ul className="pending">
        {store.transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  ) : null;
});

const Blocks: FC = observer(() => {
  const store = useStore();
  return (
    <div>
      <h2>区块</h2>
      <ul className="blocks">
        {[...store.blocks].reverse().map((block) => {
          return (
            <li key={block.hash}>
                <h3>{block.hash}</h3>
                <pre>{JSON.stringify(block.transactions,null,2)}</pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
export default Home;
