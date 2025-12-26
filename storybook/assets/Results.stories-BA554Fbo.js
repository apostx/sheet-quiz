import{j as e}from"./jsx-runtime-u17CrQMm.js";import{H as j}from"./index-CEL4Hz1D.js";import"./iframe-t7JyBQKO.js";import"./preload-helper-PPVm8Dsz.js";const A=({score:N,total:h,topicName:R,questions:Q,userAnswers:v,onRestart:k})=>{const a=h===0?0:Math.round(N/h*100),z=()=>a===100?"Perfect!":a>=80?"Great job!":a>=60?"Good effort!":"Keep practicing!";return e.jsxs("div",{className:"max-w-4xl mx-auto p-4",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6",children:[e.jsx("h2",{className:"text-2xl sm:text-3xl font-bold mb-4 text-center",children:R}),e.jsx("p",{className:"text-lg sm:text-xl mb-6 text-center",children:z()}),e.jsxs("div",{className:"text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-blue-600 text-center",children:[N," / ",h]}),e.jsxs("div",{className:"text-xl sm:text-2xl mb-8 text-gray-600 text-center",children:[a,"%"]}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:k,className:"px-4 py-3 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium",children:"Try Again"})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl sm:text-2xl font-bold mb-4",children:"Review"}),Q.map((s,w)=>{const b=v.get(w)||new Set,y=b.size===s.correctOptions.length&&s.correctOptions.every(t=>b.has(t));return e.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-6",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{className:`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold ${y?"bg-green-500":"bg-red-500"}`,children:y?"✓":"✗"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("h4",{className:"font-bold text-base sm:text-lg mb-1",children:["Question ",w+1]}),e.jsx("p",{className:"text-gray-800 text-sm sm:text-base",children:s.question}),s.note&&e.jsx(j,{html:s.note,variant:"light",className:"text-gray-600 text-xs sm:text-sm mt-2 italic"})]})]}),e.jsx("div",{className:"ml-11 space-y-2",children:s.options.map((t,G)=>{const i=b.has(t),n=s.correctOptions.includes(t);let c="bg-gray-50",r="";return n&&i?(c="bg-green-100 border-2 border-green-500",r="✓ Correct"):n&&!i?(c="bg-green-100 border-2 border-green-500",r="✓ Correct (not selected)"):!n&&i&&(c="bg-red-100 border-2 border-red-500",r="✗ Your answer (incorrect)"),e.jsxs("div",{className:`p-3 rounded ${c}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[r&&e.jsxs("span",{className:`font-bold ${n?"text-green-700":"text-red-700"}`,children:[r,":"]}),e.jsx("span",{className:r?"font-medium":"",children:t.response})]}),t.hint&&(n||i)&&e.jsx(j,{html:t.hint,variant:"light",className:"text-sm mt-1 text-gray-600"})]},`opt-${G}-${t.response.slice(0,15)}`)})})]},`q-${w}-${s.question.slice(0,20)}`)})]})]})};A.__docgenInfo={description:"",methods:[],displayName:"Results",props:{score:{required:!0,tsType:{name:"number"},description:""},total:{required:!0,tsType:{name:"number"},description:""},topicName:{required:!0,tsType:{name:"string"},description:""},questions:{required:!0,tsType:{name:"Array",elements:[{name:"QuizQuestion"}],raw:"QuizQuestion[]"},description:""},userAnswers:{required:!0,tsType:{name:"Map",elements:[{name:"number"},{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"}],raw:"Map<number, Set<QuizOption>>"},description:""},onRestart:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const B={title:"Components/Results",component:A,parameters:{layout:"fullscreen"}},o={response:"Paris",hint:"It is known as the City of Light"},q={response:"London",hint:""},M={response:"Berlin",hint:""},u={response:"4",hint:"This is basic arithmetic"},S={response:"3",hint:""},O={response:"5",hint:""},f={response:"Blue",hint:"Like the sky"},x={response:"Red",hint:""},T={response:"Green",hint:""},g=[{question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[o,q,M],correctOptions:[o],isMultiAnswer:!1},{question:"What is 2 + 2?",note:"",options:[u,S,O],correctOptions:[u],isMultiAnswer:!1},{question:"What color is the sky on a clear day?",note:"Think about what you see when you look up",options:[f,x,T],correctOptions:[f],isMultiAnswer:!1}],C=new Map([[0,new Set([o])],[1,new Set([u])],[2,new Set([f])]]),K=new Map([[0,new Set([o])],[1,new Set([u])],[2,new Set([x])]]),$=new Map([[0,new Set([o])],[1,new Set([S])],[2,new Set([x])]]),P=new Map([[0,new Set([q])],[1,new Set([S])],[2,new Set([x])]]),l={args:{score:3,total:3,topicName:"General Knowledge Quiz",questions:g,userAnswers:C,onRestart:()=>console.log("Restart clicked")}},m={args:{score:2,total:3,topicName:"General Knowledge Quiz",questions:g,userAnswers:K,onRestart:()=>console.log("Restart clicked")}},d={args:{score:1,total:3,topicName:"General Knowledge Quiz",questions:g,userAnswers:$,onRestart:()=>console.log("Restart clicked")}},p={args:{score:0,total:3,topicName:"General Knowledge Quiz",questions:g,userAnswers:P,onRestart:()=>console.log("Restart clicked")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    score: 3,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: perfectScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    score: 2,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: goodScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    score: 1,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: mixedScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    score: 0,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: poorScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...p.parameters?.docs?.source}}};const H=["PerfectScore","GoodScore","MixedScore","PoorScore"];export{m as GoodScore,d as MixedScore,l as PerfectScore,p as PoorScore,H as __namedExportsOrder,B as default};
