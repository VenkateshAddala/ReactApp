import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout as Footer } from 'antd';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import ListDetails from "./ListDetails";
import InsertDetails from "./InsertDetails";
import UpdateDetails from "./UpdateDetails";
import { InsertToro } from "./InsertToro";
import Button from '@material-ui/core/Button';
import SearchComponent from "./SearchComponent";
import { SearchToro } from "./SearchToro";
import { UpdateToro } from "./UpdateToro";
import "../App.css";
import { Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Analytics } from "./Analytics";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }, title: {
    flexGrow: 1,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

const onClick = ({ key }) => {
  console.log(`Click on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd memu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

export default function Header(props) {

  return (

    <React.Fragment >
      <CssBaseline />
      <AppBar>
        {/*  <Toolbar>
          <Typography edge="start" variant="h6" style={{ fontSize: "20px" }}>Lab Links</Typography>
        </Toolbar> */}
        {/*  <nav class="navbar navbar-expand-lg navbar-light newbox" style={{ backgroundColor: "#e3f2fd", height: "10vh" }}>
          <a class="navbar-brand" href="#">LabLinks</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">

              <li class="nav-item">
                <Link class="nav-link" to="/">Microbial</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Insert_Toro">Torocell</Link>
              </li>
              <li class="nav-item ">
                <Link class="nav-link" to="/Lablink Analytics" >Analytics <span class="sr-only">(current)</span></Link>
              </li>
            </ul>
          </div>
        </nav> */}
        <Navbar style={{ backgroundColor: "#e3f2fd", height: "auto" }} expand="lg">
          <Navbar.Brand href="#home">LabLinks</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="tags-container" className="mr-auto">
              <Link class="nav-link tags" activeStyle={{ color: 'red' }} to="/">Microbial</Link>
              <Link class="nav-link" to="/Insert_Toro">Torocell</Link>
              <Link class="nav-link" to="/Lablink Analytics">Analytics</Link>
              <NavDropdown title="View Records" id="basic-nav-dropdown">
                <NavDropdown.Item><Link class="nav-link" to="/Get_Details">Microbial Records</Link></NavDropdown.Item>
                <NavDropdown.Item><Link class="nav-link" to="/Get_Toro_Records">Torocell Records</Link></NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container >
        <div class="container" >
          <div class="container" >

            <Switch>

              <Route path="/" exact component={InsertDetails} />
              <Route path="/Update_Details/:id" exact component={UpdateDetails} />
              <Route path="/Get_Details" exact component={SearchComponent} />
              <Route path="/Insert_Toro" exact component={InsertToro} />
              <Route path="/Update_Toro/:id" exact component={UpdateToro} />
              <Route path="/Get_Toro_Records" exact component={SearchToro} />
              <Route path="/Lablink Analytics" exact component={Analytics} />
            </Switch>
          </div>

        </div>
      </Container>
      <Footer style={{
        textAlign: 'center', height: '50px', position: 'inherit'
      }}><p style={{ paddingTop: "15px" }}>Copyrights ©2020 by Exafluence</p></Footer>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment >
  );
}


