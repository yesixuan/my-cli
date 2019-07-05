---
extend: '@vicli/cli-service/generator/template/src/App.jsx'
replace:
  - !!js/regexp /\.jsx/g
  - !!js/regexp /App.+?=>/
---

<%# REPLACE %>
.tsx
<%# END_REPLACE %>
<%# REPLACE %>
App: React.FC = () =>
<%# END_REPLACE %>
