import{j as s}from"./jsx-runtime-u17CrQMm.js";import{r as m}from"./iframe-B6JjER34.js";import{O as x}from"./OptionButton-Cdz9VI0S.js";/* empty css              */import"./preload-helper-PPVm8Dsz.js";const g=({question:e,selectedOptions:S,isAnswered:f,onSelectOption:O})=>{const[o,h]=m.useState(!1),d=m.useRef(null);return m.useEffect(()=>{const t=u=>{d.current&&!d.current.contains(u.target)&&h(!1)};return o&&(document.addEventListener("mousedown",t),document.addEventListener("touchstart",t)),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("touchstart",t)}},[o]),s.jsx("div",{className:"max-w-3xl mx-auto",children:s.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-6",children:[s.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold flex-1",children:e.question}),e.note&&s.jsxs("div",{ref:d,className:"relative group flex-shrink-0",children:[s.jsx("div",{className:"w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer",onClick:t=>{t.stopPropagation(),h(!o)},children:"?"}),s.jsx("div",{className:`absolute bottom-full right-0 mb-2 w-64 sm:w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 ${o?"block":"hidden group-hover:block"}`,children:s.jsxs("div",{className:"relative",children:[e.note,s.jsx("div",{className:"absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"})]})})]})]}),s.jsx("div",{className:"space-y-3",children:e.options.map((t,u)=>s.jsx(x,{option:t,isSelected:S.has(t),isAnswered:f,isCorrect:e.correctOptions.includes(t),isMultiAnswer:e.isMultiAnswer,onClick:()=>O(t)},u))})]})})};g.__docgenInfo={description:"",methods:[],displayName:"QuestionCard",props:{question:{required:!0,tsType:{name:"QuizQuestion"},description:""},selectedOptions:{required:!0,tsType:{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"},description:""},isAnswered:{required:!0,tsType:{name:"boolean"},description:""},onSelectOption:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: QuizOption) => void",signature:{arguments:[{type:{name:"QuizOption"},name:"option"}],return:{name:"void"}}},description:""}}};const C={title:"Components/QuestionCard",component:g,parameters:{layout:"padded"}},l={response:"Paris",hint:"It is known as the City of Light"},w={response:"London",hint:""},b={response:"Berlin",hint:""},v={response:"Madrid",hint:""},p={question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[l,w,b,v],correctOptions:[l],isMultiAnswer:!1},A={question:"What is 2 + 2?",note:"",options:[{response:"4",hint:"This is basic arithmetic"},{response:"3",hint:""},{response:"5",hint:""},{response:"22",hint:"This would be string concatenation"}],correctOptions:[{response:"4",hint:"This is basic arithmetic"}],isMultiAnswer:!1},n={args:{question:p,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},r={args:{question:A,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},i={args:{question:p,selectedOptions:new Set([l]),isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},a={args:{question:p,selectedOptions:new Set([l]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}},c={args:{question:p,selectedOptions:new Set([w]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const T=["Default","WithoutNote","OptionSelected","CorrectAnswerSubmitted","IncorrectAnswerSubmitted"];export{a as CorrectAnswerSubmitted,n as Default,c as IncorrectAnswerSubmitted,i as OptionSelected,r as WithoutNote,T as __namedExportsOrder,C as default};
