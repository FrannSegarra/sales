import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <Header/>
      <body className={classes.body}>
        <Card>
          {props.children}
        </Card>
      </body>
      <Footer/>
    </Fragment>
  )
}

export default Layout;