import{j as s}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-DnyE1TII.js";import{u as b,O as j}from"./OptionButton-BWusEuvT.js";import{H as A}from"./HtmlContent-D7rd7ba5.js";/* empty css              */import"./preload-helper-PPVm8Dsz.js";const h=({question:e,selectedOptions:w,isAnswered:x,onSelectOption:S})=>{const[o,d]=u.useState(!1),m=u.useRef(null),f=u.useCallback(()=>d(!1),[]);return b(m,o,f),s.jsx("div",{className:"max-w-3xl mx-auto",children:s.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-4 sm:p-6",children:[s.jsxs("div",{className:"flex items-start gap-3 mb-6",children:[s.jsx("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold flex-1",children:e.question}),e.note&&s.jsxs("div",{ref:m,className:"relative group flex-shrink-0",children:[s.jsx("div",{className:"w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm cursor-pointer",onClick:t=>{t.stopPropagation(),d(!o)},role:"button","aria-label":"Show note","aria-expanded":o,children:"?"}),s.jsxs("div",{className:`fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:right-0 sm:mt-2 sm:w-80 sm:max-h-[70vh] flex flex-col bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 ${o?"flex":"hidden sm:group-hover:flex"}`,children:[s.jsx("button",{className:"flex-shrink-0 self-end m-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white sm:hidden",onClick:t=>{t.stopPropagation(),d(!1)},"aria-label":"Close note",children:s.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),s.jsx("div",{className:"overflow-y-auto px-3 pb-3 sm:p-3",children:s.jsx(A,{html:e.note,variant:"tooltip"})})]})]})]}),s.jsx("div",{className:"space-y-3",children:e.options.map((t,O)=>s.jsx(j,{option:t,isSelected:w.has(t),isAnswered:x,isCorrect:e.correctOptions.includes(t),isMultiAnswer:e.isMultiAnswer,onClick:()=>S(t)},`opt-${O}-${t.response.slice(0,15)}`))})]})})};h.__docgenInfo={description:"",methods:[],displayName:"QuestionCard",props:{question:{required:!0,tsType:{name:"QuizQuestion"},description:""},selectedOptions:{required:!0,tsType:{name:"Set",elements:[{name:"QuizOption"}],raw:"Set<QuizOption>"},description:""},isAnswered:{required:!0,tsType:{name:"boolean"},description:""},onSelectOption:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: QuizOption) => void",signature:{arguments:[{type:{name:"QuizOption"},name:"option"}],return:{name:"void"}}},description:""}}};const W={title:"Components/QuestionCard",component:h,parameters:{layout:"padded"}},c={response:"Paris",hint:"It is known as the City of Light"},g={response:"London",hint:""},v={response:"Berlin",hint:""},y={response:"Madrid",hint:""},p={question:"What is the capital of France?",note:"This question tests your knowledge of European geography",options:[c,g,v,y],correctOptions:[c],isMultiAnswer:!1},N={question:"What is 2 + 2?",note:"",options:[{response:"4",hint:"This is basic arithmetic"},{response:"3",hint:""},{response:"5",hint:""},{response:"22",hint:"This would be string concatenation"}],correctOptions:[{response:"4",hint:"This is basic arithmetic"}],isMultiAnswer:!1},n={args:{question:p,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},r={args:{question:N,selectedOptions:new Set,isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},i={args:{question:p,selectedOptions:new Set([c]),isAnswered:!1,onSelectOption:e=>console.log("Selected:",e.response)}},a={args:{question:p,selectedOptions:new Set([c]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}},l={args:{question:p,selectedOptions:new Set([g]),isAnswered:!0,onSelectOption:e=>console.log("Selected:",e.response)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    question: sampleQuestion,
    selectedOptions: new Set([option2]),
    isAnswered: true,
    onSelectOption: option => console.log('Selected:', option.response)
  }
}`,...l.parameters?.docs?.source}}};const z=["Default","WithoutNote","OptionSelected","CorrectAnswerSubmitted","IncorrectAnswerSubmitted"];export{a as CorrectAnswerSubmitted,n as Default,l as IncorrectAnswerSubmitted,i as OptionSelected,r as WithoutNote,z as __namedExportsOrder,W as default};
