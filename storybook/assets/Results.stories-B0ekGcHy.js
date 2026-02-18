import{j as e}from"./jsx-runtime-u17CrQMm.js";import{H as l}from"./HtmlContent-DU4oKYGB.js";/* empty css              */import"./iframe-yxFducXL.js";import"./preload-helper-PPVm8Dsz.js";const A=({score:j,total:w,topicName:v,questions:R,userAnswers:Q,onRestart:k})=>{const a=w===0?0:Math.round(j/w*100),z=()=>a===100?"Perfect!":a>=80?"Great job!":a>=60?"Good effort!":"Keep practicing!";return e.jsxs("div",{className:"max-w-4xl mx-auto p-4",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6",children:[e.jsx("h2",{className:"text-2xl sm:text-3xl font-bold mb-4 text-center",children:v}),e.jsx("p",{className:"text-lg sm:text-xl mb-6 text-center",children:z()}),e.jsxs("div",{className:"text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-blue-600 text-center",children:[j," / ",w]}),e.jsxs("div",{className:"text-xl sm:text-2xl mb-8 text-gray-600 text-center",children:[a,"%"]}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:k,className:"px-4 py-3 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium",children:"Try Again"})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-xl sm:text-2xl font-bold mb-4",children:"Review"}),R.map((s,b)=>{const f=Q.get(b)||new Set,y=f.size===s.correctOptions.length&&s.correctOptions.every(t=>f.has(t));return e.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-6",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{className:`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold ${y?"bg-green-500":"bg-red-500"}`,children:y?"✓":"✗"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("h4",{className:"font-bold text-base sm:text-lg mb-1",children:["Question ",b+1]}),e.jsx("div",{className:"text-gray-800 text-sm sm:text-base",children:e.jsx(l,{html:s.question,variant:"light"})}),s.note&&e.jsxs("div",{className:"mt-3 pt-2 border-t border-gray-200",children:[e.jsx("span",{className:"text-xs font-semibold text-gray-500 uppercase tracking-wide",children:"Explanation"}),e.jsx(l,{html:s.note,variant:"light",className:"text-gray-600 text-xs sm:text-sm mt-1"})]})]})]}),e.jsx("div",{className:"ml-11 space-y-2",children:s.options.map((t,G)=>{const i=f.has(t),n=s.correctOptions.includes(t);let c="bg-gray-50",r="";return n&&i?(c="bg-green-100 border-2 border-green-500",r="✓ Correct"):n&&!i?(c="bg-green-100 border-2 border-green-500",r="✓ Correct (not selected)"):!n&&i&&(c="bg-red-100 border-2 border-red-500",r="✗ Your answer (incorrect)"),e.jsxs("div",{className:`p-3 rounded ${c}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[r&&e.jsxs("span",{className:`font-bold ${n?"text-green-700":"text-red-700"}`,children:[r,":"]}),e.jsx("span",{className:r?"font-medium":"",children:e.jsx(l,{html:t.response,variant:"light"})})]}),t.hint&&(n||i)&&e.jsx(l,{html:t.hint,variant:"light",className:"text-sm mt-1 text-gray-600"})]},`opt-${G}-${t.response.slice(0,15)}`)})})]},`q-${b}-${s.question.slice(0,20)}`)})]})]})};A.__docgenInfo={description:"",methods:[],displayName:"Results",props:{score:{required:!0,tsType:{name:"number"},description:""},total:{required:!0,tsType:{name:"number"},description:""},topicName:{required:!0,tsType:{name:"string"},description:""},questions:{required:!0,tsType:{name:"Array",elements:[{name:"QuizQuestion"}],raw:"QuizQuestion[]"},description:""},userAnswers:{required:!0,tsType:{name:"Map",elements:[{name:"number"},{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"}],raw:"Map<number, Set<QuizOption>>"},description:""},onRestart:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const H={title:"Components/Results",component:A,parameters:{layout:"fullscreen"}},o={response:"Paris",hint:"It is known as the City of Light"},q={response:"London",hint:""},M={response:"Berlin",hint:""},x={response:"4",hint:"This is basic arithmetic"},N={response:"3",hint:""},O={response:"5",hint:""},S={response:"Blue",hint:"Like the sky"},g={response:"Red",hint:""},T={response:"Green",hint:""},h=[{question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[o,q,M],correctOptions:[o],isMultiAnswer:!1},{question:"What is 2 + 2?",note:"",options:[x,N,O],correctOptions:[x],isMultiAnswer:!1},{question:"What color is the sky on a clear day?",note:"Think about what you see when you look up",options:[S,g,T],correctOptions:[S],isMultiAnswer:!1}],C=new Map([[0,new Set([o])],[1,new Set([x])],[2,new Set([S])]]),K=new Map([[0,new Set([o])],[1,new Set([x])],[2,new Set([g])]]),$=new Map([[0,new Set([o])],[1,new Set([N])],[2,new Set([g])]]),P=new Map([[0,new Set([q])],[1,new Set([N])],[2,new Set([g])]]),m={args:{score:3,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:C,onRestart:()=>console.log("Restart clicked")}},d={args:{score:2,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:K,onRestart:()=>console.log("Restart clicked")}},p={args:{score:1,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:$,onRestart:()=>console.log("Restart clicked")}},u={args:{score:0,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:P,onRestart:()=>console.log("Restart clicked")}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    score: 3,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: perfectScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    score: 2,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: goodScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    score: 1,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: mixedScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    score: 0,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: poorScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...u.parameters?.docs?.source}}};const I=["PerfectScore","GoodScore","MixedScore","PoorScore"];export{d as GoodScore,p as MixedScore,m as PerfectScore,u as PoorScore,I as __namedExportsOrder,H as default};
