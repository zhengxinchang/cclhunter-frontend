import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import home from '../components/home'
import home2 from '../components/home'
import barcodes from "@/components/barcodes";
import celllineList from "@/components/celllineList";
import cellDetailPage from "@/components/cellDetailPage";
import taskPanel from "../components/taskPanel";
import annotatedResultPage from "../components/annotatedResultPage";
import downloads from "../components/downloads";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home",
  },
  {
    path: '/home',
    name: 'home',
    component: home2
  },
  {
    path: '/task',
    name: 'task',
    component: taskPanel,
    // children: [
    //   {
    //     path: 'results',
    //     component: annotatedResultPage,
    //   },
    // ]
  },

  {
    path: '/task/results',
    name: 'taskResults',
    component: annotatedResultPage,
  },

  {
    path: '/barcodes',
    name: 'barcodes',
    component:barcodes,
    beforeEnter: (to, from,next) => {
      store.state.currtab=1;
      next();
    },
  },
  {
    path: '/celllinelist',
    name: 'celllineList',
    component:celllineList,
    beforeEnter: (to, from,next) => {
      store.state.currtab=1;
      next();
    },
  },
  {
    path: '/celllinelist/:cid',
    name: 'celllinedetail',
    component:cellDetailPage
  },
  {
    path: '/downloads',
    name: 'downloads',
    component:downloads
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
