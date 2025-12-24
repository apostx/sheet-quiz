import{j as e}from"./jsx-runtime-u17CrQMm.js";/* empty css              */const j=({score:S,total:N,topicName:q,questions:R,userAnswers:Q,onRestart:v})=>{const a=Math.round(S/N*100),k=()=>a===100?"Perfect!":a>=80?"Great job!":a>=60?"Good effort!":"Keep practicing!";return e.jsxs("div",{className:"max-w-4xl mx-auto p-4",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8 mb-6",children:[e.jsx("h2",{className:"text-3xl font-bold mb-4 text-center",children:q}),e.jsx("p",{className:"text-xl mb-6 text-center",children:k()}),e.jsxs("div",{className:"text-6xl font-bold mb-6 text-blue-600 text-center",children:[S," / ",N]}),e.jsxs("div",{className:"text-2xl mb-8 text-gray-600 text-center",children:[a,"%"]}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:v,className:"px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium",children:"Try Again"})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-2xl font-bold mb-4",children:"Review"}),R.map((s,w)=>{const x=Q.get(w)||new Set,y=x.size===s.correctOptions.length&&s.correctOptions.every(t=>x.has(t));return e.jsxs("div",{className:"bg-white rounded-lg shadow p-6",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{className:`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${y?"bg-green-500":"bg-red-500"}`,children:y?"✓":"✗"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("h4",{className:"font-bold text-lg mb-1",children:["Question ",w+1]}),e.jsx("p",{className:"text-gray-800",children:s.question}),s.note&&e.jsx("p",{className:"text-gray-600 text-sm mt-2 italic",children:s.note})]})]}),e.jsx("div",{className:"ml-11 space-y-2",children:s.options.map((t,z)=>{const c=x.has(t),n=s.correctOptions.includes(t);let i="bg-gray-50",r="";return n&&c?(i="bg-green-100 border-2 border-green-500",r="✓ Correct"):n&&!c?(i="bg-green-100 border-2 border-green-500",r="✓ Correct (not selected)"):!n&&c&&(i="bg-red-100 border-2 border-red-500",r="✗ Your answer (incorrect)"),e.jsxs("div",{className:`p-3 rounded ${i}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[r&&e.jsxs("span",{className:`font-bold ${n?"text-green-700":"text-red-700"}`,children:[r,":"]}),e.jsx("span",{className:r?"font-medium":"",children:t.response})]}),t.hint&&(n||c)&&e.jsx("div",{className:"text-sm mt-1 text-gray-600",children:t.hint})]},z)})})]},w)})]})]})};j.__docgenInfo={description:"",methods:[],displayName:"Results",props:{score:{required:!0,tsType:{name:"number"},description:""},total:{required:!0,tsType:{name:"number"},description:""},topicName:{required:!0,tsType:{name:"string"},description:""},questions:{required:!0,tsType:{name:"Array",elements:[{name:"QuizQuestion"}],raw:"QuizQuestion[]"},description:""},userAnswers:{required:!0,tsType:{name:"Map",elements:[{name:"number"},{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"}],raw:"Map<number, Set<QuizOption>>"},description:""},onRestart:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const L={title:"Components/Results",component:j,parameters:{layout:"fullscreen"}},o={response:"Paris",hint:"It is known as the City of Light"},A={response:"London",hint:""},G={response:"Berlin",hint:""},m={response:"4",hint:"This is basic arithmetic"},f={response:"3",hint:""},M={response:"5",hint:""},b={response:"Blue",hint:"Like the sky"},g={response:"Red",hint:""},O={response:"Green",hint:""},h=[{question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[o,A,G],correctOptions:[o],isMultiAnswer:!1},{question:"What is 2 + 2?",note:"",options:[m,f,M],correctOptions:[m],isMultiAnswer:!1},{question:"What color is the sky on a clear day?",note:"Think about what you see when you look up",options:[b,g,O],correctOptions:[b],isMultiAnswer:!1}],T=new Map([[0,new Set([o])],[1,new Set([m])],[2,new Set([b])]]),K=new Map([[0,new Set([o])],[1,new Set([m])],[2,new Set([g])]]),C=new Map([[0,new Set([o])],[1,new Set([f])],[2,new Set([g])]]),P=new Map([[0,new Set([A])],[1,new Set([f])],[2,new Set([g])]]),l={args:{score:3,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:T,onRestart:()=>console.log("Restart clicked")}},d={args:{score:2,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:K,onRestart:()=>console.log("Restart clicked")}},p={args:{score:1,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:C,onRestart:()=>console.log("Restart clicked")}},u={args:{score:0,total:3,topicName:"General Knowledge Quiz",questions:h,userAnswers:P,onRestart:()=>console.log("Restart clicked")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    score: 3,
    total: 3,
    topicName: 'General Knowledge Quiz',
    questions: sampleQuestions,
    userAnswers: perfectScoreAnswers,
    onRestart: () => console.log('Restart clicked')
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};const W=["PerfectScore","GoodScore","MixedScore","PoorScore"];export{d as GoodScore,p as MixedScore,l as PerfectScore,u as PoorScore,W as __namedExportsOrder,L as default};
