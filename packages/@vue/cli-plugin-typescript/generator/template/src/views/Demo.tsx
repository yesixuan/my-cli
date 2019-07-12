---
extend: '@vicli/cli-service/generator/router/template/src/views/Demo.jsx'
when: 'rootOptions.router'
replace:
  - !!js/regexp /Demo.+?=>/
---

<%# REPLACE %>
Demo: React.FC = () =>
<%# END_REPLACE %>
