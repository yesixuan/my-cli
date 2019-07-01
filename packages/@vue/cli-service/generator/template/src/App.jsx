<%_ if (!rootOptions.router) { _%>
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Vic</h2>
      </header>
    </div>
  );
}

export default App;
<%_ } else { _%>
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<%_ } _%>
