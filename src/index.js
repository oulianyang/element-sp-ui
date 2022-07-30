/* Automatically generated by './build/bin/build-entry.js' */

import Affix from '../packages/affix/index.js';
import AffixList from '../packages/affix-list/index.js';
import Alert from '../packages/alert/index.js';
import Aside from '../packages/aside/index.js';
import Avatar from '../packages/avatar/index.js';
import Autocomplete from '../packages/autocomplete/index.js';
import Card from '../packages/card/index.js';
import Carousel from '../packages/carousel/index.js';
import CarouselItem from '../packages/carousel-item/index.js';
import Collapse from '../packages/collapse/index.js';
import CollapseItem from '../packages/collapse-item/index.js';
import ColorPicker from '../packages/color-picker/index.js';
import ACalendar from '../packages/a-calendar/index.js';
import Col from '../packages/col/index.js';
import Container from '../packages/container/index.js';
import Dropdown from '../packages/dropdown/index.js';
import DropdownMenu from '../packages/dropdown-menu/index.js';
import DropdownItem from '../packages/dropdown-item/index.js';
import Dialog from '../packages/dialog/index.js';
import Empty from '../packages/empty/index.js';
import Menu from '../packages/menu/index.js';
import Submenu from '../packages/submenu/index.js';
import MenuItem from '../packages/menu-item/index.js';
import MenuItemGroup from '../packages/menu-item-group/index.js';
import Input from '../packages/input/index.js';
import InputNumber from '../packages/input-number/index.js';
import InputNumberRange from '../packages/input-number-range/index.js';
import Loading from '../packages/loading/index.js';
import Button from '../packages/button/index.js';
import ButtonGroup from '../packages/button-group/index.js';
import Form from '../packages/form/index.js';
import FormItem from '../packages/form-item/index.js';
import Message from '../packages/message/index.js';
import MessageBox from '../packages/message-box/index.js';
import Scrollbar from '../packages/scrollbar/index.js';
import Select from '../packages/select/index.js';
import SelectTree from '../packages/select-tree/index.js';
import Steps from '../packages/steps/index.js';
import Step from '../packages/step/index.js';
import Option from '../packages/option/index.js';
import OptionGroup from '../packages/option-group/index.js';
import Pagination from '../packages/pagination/index.js';
import Popover from '../packages/popover/index.js';
import Tooltip from '../packages/tooltip/index.js';
import Backtop from '../packages/backtop/index.js';
import InfiniteScroll from '../packages/infinite-scroll/index.js';
import Switch from '../packages/switch/index.js';
import Icon from '../packages/icon/index.js';
import IntraDisperse from '../packages/intra-disperse/index.js';
import Tabs from '../packages/tabs/index.js';
import TabPane from '../packages/tab-pane/index.js';
import Tag from '../packages/tag/index.js';
import Table from '../packages/table/index.js';
import TableColumn from '../packages/table-column/index.js';
import Rate from '../packages/rate/index.js';
import Link from '../packages/link/index.js';
import Progress from '../packages/progress/index.js';
import Drawer from '../packages/drawer/index.js';
import Divider from '../packages/divider/index.js';
import Popconfirm from '../packages/popconfirm/index.js';
import Tree from '../packages/tree/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import CheckboxButton from '../packages/checkbox-button/index.js';
import Radio from '../packages/radio/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import RadioButton from '../packages/radio-button/index.js';
import Badge from '../packages/badge/index.js';
import Timeline from '../packages/timeline/index.js';
import TimelineItem from '../packages/timeline-item/index.js';
import Breadcrumb from '../packages/breadcrumb/index.js';
import BreadcrumbItem from '../packages/breadcrumb-item/index.js';
import Anchor from '../packages/anchor/index.js';
import AnchorLink from '../packages/anchor-link/index.js';
import InputSearch from '../packages/input-search/index.js';
import PageHeader from '../packages/page-header/index.js';
import Upload from '../packages/upload/index.js';
import DatePicker from '../packages/date-picker/index.js';
import TimeSelect from '../packages/time-select/index.js';
import TimePicker from '../packages/time-picker/index.js';
import Descriptions from '../packages/descriptions/index.js';
import DescriptionsItem from '../packages/descriptions-item/index.js';
import Footer from '../packages/footer/index.js';
import Image from '../packages/image/index.js';
import Main from '../packages/main/index.js';
import Notification from '../packages/notification/index.js';
import Row from '../packages/row/index.js';
import Skeleton from '../packages/skeleton/index.js';
import SkeletonItem from '../packages/skeleton-item/index.js';
import Slider from '../packages/slider/index.js';
import Spinner from '../packages/spinner/index.js';
import Transfer from '../packages/transfer/index.js';
import Header from '../packages/header/index.js';
import Result from '../packages/result/index.js';
import Cascader from '../packages/cascader/index.js';
import CascaderPanel from '../packages/cascader-panel/index.js';
import locale from '@fe/element-sp-ui/src/locale';
import CollapseTransition from '@fe/element-sp-ui/src/transitions/collapse-transition';
import switchTheme from '@fe/element-sp-ui/src/utils/switchTheme.js';

const components = [
  Affix,
  AffixList,
  Alert,
  Aside,
  Avatar,
  Autocomplete,
  Card,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  ColorPicker,
  ACalendar,
  Col,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Empty,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  InputNumberRange,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Scrollbar,
  Select,
  SelectTree,
  Steps,
  Step,
  Option,
  OptionGroup,
  Pagination,
  Popover,
  Tooltip,
  Backtop,
  Switch,
  Icon,
  IntraDisperse,
  Tabs,
  TabPane,
  Tag,
  Table,
  TableColumn,
  Rate,
  Link,
  Progress,
  Drawer,
  Divider,
  Popconfirm,
  Tree,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Radio,
  RadioGroup,
  RadioButton,
  Badge,
  Timeline,
  TimelineItem,
  Breadcrumb,
  BreadcrumbItem,
  Anchor,
  AnchorLink,
  InputSearch,
  PageHeader,
  Upload,
  DatePicker,
  TimeSelect,
  TimePicker,
  Descriptions,
  DescriptionsItem,
  Footer,
  Image,
  Main,
  Row,
  Skeleton,
  SkeletonItem,
  Slider,
  Spinner,
  Transfer,
  Header,
  Result,
  Cascader,
  CascaderPanel,
  CollapseTransition
];

const install = function(Vue, opts = {
  hasElement: false
}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(InfiniteScroll);
  Vue.use(Loading.directive);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  Vue.prototype.hasElement = opts.hasElement;
  const protoPreStr = opts.hasElement ? 'sp' : '';
  Vue.prototype[`$${protoPreStr}loading`] = Loading.service;
  Vue.prototype[`$${protoPreStr}msgbox`] = MessageBox;
  Vue.prototype[`$${protoPreStr}alert`] = MessageBox.alert;
  Vue.prototype[`$${protoPreStr}confirm`] = MessageBox.confirm;
  Vue.prototype[`$${protoPreStr}prompt`] = MessageBox.prompt;
  Vue.prototype[`$${protoPreStr}notify`] = Notification;
  Vue.prototype[`$${protoPreStr}message`] = Message;
  Vue.prototype.$switchelementtheme = switchTheme;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.36',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  Loading,
  Affix,
  AffixList,
  Alert,
  Aside,
  Avatar,
  Autocomplete,
  Card,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  ColorPicker,
  ACalendar,
  Col,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Empty,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  InputNumberRange,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Message,
  MessageBox,
  Scrollbar,
  Select,
  SelectTree,
  Steps,
  Step,
  Option,
  OptionGroup,
  Pagination,
  Popover,
  Tooltip,
  Backtop,
  InfiniteScroll,
  Switch,
  Icon,
  IntraDisperse,
  Tabs,
  TabPane,
  Tag,
  Table,
  TableColumn,
  Rate,
  Link,
  Progress,
  Drawer,
  Divider,
  Popconfirm,
  Tree,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Radio,
  RadioGroup,
  RadioButton,
  Badge,
  Timeline,
  TimelineItem,
  Breadcrumb,
  BreadcrumbItem,
  Anchor,
  AnchorLink,
  InputSearch,
  PageHeader,
  Upload,
  DatePicker,
  TimeSelect,
  TimePicker,
  Descriptions,
  DescriptionsItem,
  Footer,
  Image,
  Main,
  Notification,
  Row,
  Skeleton,
  SkeletonItem,
  Slider,
  Spinner,
  Transfer,
  Header,
  Result,
  Cascader,
  CascaderPanel
};