import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as I}from"./iframe-DnyE1TII.js";import{L as d}from"./ListManager-Btlbokup.js";/* empty css              */import"./preload-helper-PPVm8Dsz.js";import"./index-7TpPh_Va.js";import"./index-BIk1wTxh.js";const M={title:"Components/ListManager",component:d,parameters:{layout:"padded"}},i=[{id:"1",label:"First Item"},{id:"2",label:"Second Item"},{id:"3",label:"Third Item"}],r={args:{items:[],onAdd:e=>console.log("Add:",e),onDelete:e=>console.log("Delete:",e),onReorder:e=>console.log("Reorder:",e),renderItem:e=>n.jsx("span",{children:e.label}),placeholder:"Enter a new item",emptyMessage:"No items yet",getId:e=>e.id}},s={args:{items:i,onAdd:e=>console.log("Add:",e),onDelete:e=>console.log("Delete:",e),onReorder:e=>console.log("Reorder:",e),renderItem:e=>n.jsx("span",{children:e.label}),placeholder:"Enter a new item",emptyMessage:"No items yet",getId:e=>e.id}},a={args:{items:Array.from({length:10},(e,o)=>({id:String(o+1),label:`Item ${o+1}`})),onAdd:e=>console.log("Add:",e),onDelete:e=>console.log("Delete:",e),onReorder:e=>console.log("Reorder:",e),renderItem:e=>n.jsx("span",{children:e.label}),placeholder:"Enter a new item",emptyMessage:"No items yet",getId:e=>e.id}};function u(){const[e,o]=I.useState(i),c=t=>{const l={id:String(Date.now()),label:t};o([...e,l])},p=t=>{o(e.filter(l=>l.id!==t.id))},g=t=>{o(t)};return n.jsx(d,{items:e,onAdd:c,onDelete:p,onReorder:g,renderItem:t=>n.jsx("span",{children:t.label}),placeholder:"Enter a new item",emptyMessage:"No items yet",getId:t=>t.id})}const m={render:()=>n.jsx(u,{})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    onAdd: value => console.log('Add:', value),
    onDelete: item => console.log('Delete:', item),
    onReorder: items => console.log('Reorder:', items),
    renderItem: (item: SimpleItem) => <span>{item.label}</span>,
    placeholder: 'Enter a new item',
    emptyMessage: 'No items yet',
    getId: (item: SimpleItem) => item.id
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    onAdd: value => console.log('Add:', value),
    onDelete: item => console.log('Delete:', item),
    onReorder: items => console.log('Reorder:', items),
    renderItem: (item: SimpleItem) => <span>{item.label}</span>,
    placeholder: 'Enter a new item',
    emptyMessage: 'No items yet',
    getId: (item: SimpleItem) => item.id
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: Array.from({
      length: 10
    }, (_, i) => ({
      id: String(i + 1),
      label: \`Item \${i + 1}\`
    })),
    onAdd: value => console.log('Add:', value),
    onDelete: item => console.log('Delete:', item),
    onReorder: items => console.log('Reorder:', items),
    renderItem: (item: SimpleItem) => <span>{item.label}</span>,
    placeholder: 'Enter a new item',
    emptyMessage: 'No items yet',
    getId: (item: SimpleItem) => item.id
  }
}`,...a.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <InteractiveListManager />
}`,...m.parameters?.docs?.source}}};const E=["Empty","WithItems","ManyItems","Interactive"];export{r as Empty,m as Interactive,a as ManyItems,s as WithItems,E as __namedExportsOrder,M as default};
