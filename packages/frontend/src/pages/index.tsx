import React from 'react';
import { useRecoilState } from 'recoil';
import { debugState } from '../states/debugState';

export default function index() {
  const [count, setCount] = useRecoilState(debugState);
  return (
    <div className="card ma-4">
      <div className="body">
        <h1>Hello</h1>
        <h2>Count = {count}</h2>
        <button className="btn primary mt-2" onClick={() => setCount(v => v + 1)}>Increment</button>
      </div>
    </div>
  )
}
