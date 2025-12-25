import{j as s}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-jcieq-kz.js";import{u as b,O as A}from"./OptionButton-CqUy5U9A.js";/* empty css              */import"./preload-helper-PPVm8Dsz.js";const h=({question:e,selectedOptions:S,isAnswered:w,onSelectOption:O})=>{const[o,u]=d.useState(!1),m=d.useRef(null),f=d.useCallback(()=>u(!1),[]);return b(m,o,f),s.jsx("div",{className:"max-w-3xl mx-auto",children:s.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-6",children:[s.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold flex-1",children:e.question}),e.note&&s.jsxs("div",{ref:m,className:"relative group flex-shrink-0",children:[s.jsx("div",{className:"w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer",onClick:t=>{t.stopPropagation(),u(!o)},role:"button","aria-label":"Show note","aria-expanded":o,children:"?"}),s.jsx("div",{className:`absolute bottom-full right-0 mb-2 w-64 sm:w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 ${o?"block":"hidden group-hover:block"}`,children:s.jsxs("div",{className:"relative",children:[e.note,s.jsx("div",{className:"absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"})]})})]})]}),s.jsx("div",{className:"space-y-3",children:e.options.map((t,x)=>s.jsx(A,{option:t,isSelected:S.has(t),isAnswered:w,isCorrect:e.correctOptions.includes(t),isMultiAnswer:e.isMultiAnswer,onClick:()=>O(t)},`opt-${x}-${t.response.slice(0,15)}`))})]})})};h.__docgenInfo={description:"",methods:[],displayName:"QuestionCard",props:{question:{required:!0,tsType:{name:"QuizQuestion"},description:""},selectedOptions:{required:!0,tsType:{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"},description:""},isAnswered:{required:!0,tsType:{name:"boolean"},description:""},onSelectOption:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: QuizOption) => void",signature:{arguments:[{type:{name:"QuizOption"},name:"option"}],return:{name:"void"}}},description:""}}};const k={title:"Components/QuestionCard",component:h,parameters:{layout:"padded"}},l={response:"Paris",hint:"It is known as the City of Light"},g={response:"London",hint:""},N={response:"Berlin",hint:""},q={response:"Madrid",hint:""},p={question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[l,g,N,q],correctOptions:[l],isMultiAnswer:!1},y={question:"What is 2 + 2?",note:"",options:[{response:"4",hint:"This is basic arithmetic"},{response:"3",hint:""},{response:"5",hint:""},{response:"22",hint:"This would be string concatenation"}],correctOptions:[{response:"4",hint:"This is basic arithmetic"}],isMultiAnswer:!1},n={args:{question:p,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},r={args:{question:y,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},i={args:{question:p,selectedOptions:new Set([l]),isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},a={args:{question:p,selectedOptions:new Set([l]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}},c={args:{question:p,selectedOptions:new Set([g]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    question: questionWithoutNote,
    selectedOptions: new Set(),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: false,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option1]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option2]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...c.parameters?.docs?.source}}};const z=["Default","WithoutNote","OptionSelected","CorrectAnswerSubmitted","IncorrectAnswerSubmitted"];export{a as CorrectAnswerSubmitted,n as Default,c as IncorrectAnswerSubmitted,i as OptionSelected,r as WithoutNote,z as __namedExportsOrder,k as default};
