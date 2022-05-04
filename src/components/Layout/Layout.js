import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <Header/>
      <div className={classes.body}>
        <Card>
          {props.children}
        </Card>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default Layout;