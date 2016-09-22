// 引入css
import './styles.css';

// 引入react
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.dev';

// 引入我们自己的类
import App from './containers/App';

// 目标节点，我们在这里用react生成的内容插入此根结点
const rootElement = document.getElementById('root');

// redux的唯一库
const store = configureStore();

// 主程序，在这里开始生成所有内容
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
