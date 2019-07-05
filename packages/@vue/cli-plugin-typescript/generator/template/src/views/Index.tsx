---
extend: '@vicli/cli-service/generator/router/template/src/views/Index.jsx'
when: 'rootOptions.router'
replace:
  - !!js/regexp /Index.+?=>/
---

<%# REPLACE %>
Index: React.FC = () =>
<%# END_REPLACE %>
