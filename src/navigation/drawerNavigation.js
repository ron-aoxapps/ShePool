import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './component/drawerContent';
import AboutUs from '../container/aboutUs';
import EditProfile from '../container/editProfile';
import Transactions from '../container/transactions';
import PaymentMethod from '../container/paymentMethod';
import Coupons from '../container/coupons';
import TripHistory from '../container/tripHistory';
import Emergency from '../container/emergency';
import PickUpLocation from '../container/pickUpLocation';
import DropOffLocation from '../container/dropOffLocation';
import OnTheWay from '../container/onTheWay';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
     <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {width: 321},
      }}>
      <Drawer.Screen name="PickUpLocation" component={PickUpLocation} />
      <Drawer.Screen name="DropOffLocation" component={DropOffLocation} />
      <Drawer.Screen name="OnTheWay" component={OnTheWay} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Transactions" component={Transactions} />
      <Drawer.Screen name="PaymentMethod" component={PaymentMethod} />
      <Drawer.Screen name="Coupons" component={Coupons} />
      <Drawer.Screen name="TripHistory" component={TripHistory} />
      <Drawer.Screen name="Emergency" component={Emergency} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;