import Sidebar from './sidebar';
import ContentSwitcher from './contentSwitcher';

require('prismjs/prism');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-yaml');
require('prismjs/plugins/toolbar/prism-toolbar');
require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard');

const sidebar = document.querySelector('.pew_sidebar');
const contentSwitcher = document.querySelector('.pew_content');

new Sidebar(sidebar);
new ContentSwitcher(contentSwitcher);

if (window.location.hash === '') {
  window.location.hash = 'pages';
}
