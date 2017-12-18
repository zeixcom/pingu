import SmartTable from './smartTable';
import Sidebar from './sidebar';
import ContentSwitcher from './contentSwitcher';
import Tabs from './tabs';
import Breadcrumb from './breadcrumb';

require('prismjs/prism');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-yaml');
require('prismjs/plugins/toolbar/prism-toolbar');
require('prism-twig2');
// require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard');

const tabs = document.querySelectorAll('.pew_tabs');
const smartTables = document.querySelectorAll('.pew_smart-table');
const sidebar = document.querySelector('.pew_sidebar');
const contentSwitcher = document.querySelector('.pew_content');
const breadcrumb = document.querySelector('.pew_breadcrumb');


if (tabs) tabs.forEach(element => new Tabs(element));
if (smartTables) smartTables.forEach(element => new SmartTable(element));
if (sidebar) new Sidebar(sidebar);
if (contentSwitcher) new ContentSwitcher(contentSwitcher);
if (breadcrumb) new Breadcrumb(breadcrumb);

// set standard for first inital load
if (window.location.hash === '' && window.location.pathname === '/') {
  window.location.hash = 'pages';
}

// page reload animation
const main = document.querySelector('.pew_main');
main.classList.remove('pew_main--layer');
