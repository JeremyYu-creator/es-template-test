import Vue from 'vue';

Vue.config.productionTip = false;

//-------------------QuickTVUI---------------------
import { QuickTVUI } from '@quicktvui/quicktvui';
import '@quicktvui/quicktvui/dist/index.css';

Vue.use(QuickTVUI);

//-------------------ES Component---------------------
import { ESComponent } from '@extscreen/es-component';

Vue.use(ESComponent);
//-------------------Config ESRouter---------------------
import ESRouter from '@extscreen/es-router';
import routes from './routes';

Vue.use(ESRouter);
const router = new ESRouter(routes);
//-------------------New Application---------------------
import App from './App.vue';

const app = new Vue({
  appName: 'EsApp',
  rootView: '#root',
  render: h => h(App),
  router,
});

//勿删
app.$start(() => {
});
//-------------------Set ESApp Instance---------------------
import { setESApp } from '@extscreen/es-core';

setESApp(app);
