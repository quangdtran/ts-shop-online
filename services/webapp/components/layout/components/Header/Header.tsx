import { isNil } from 'lodash'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'

import { useModelProvider } from '@models/model.provider'

import { Dropdown } from './components/Dropdown'
import { productService } from '@services'
import { useRouter } from 'next/router'

export const Header: React.FunctionComponent = observer(() => {
  const {
    authModel: { isSignedIn, currentUser },
  } = useModelProvider()

  const [showBrandDropdown, setShowBrandDropdown] = React.useState(false)
  const [brands, setBrands] = React.useState([])
  const [currentPath, setCurrentPath] = React.useState('')

  const toggleBrandDropdown = () => {
    setShowBrandDropdown(!showBrandDropdown)
  }

  const router = useRouter()

  React.useEffect(() => {
    if (!router.isReady) {
      return
    }
    setCurrentPath(router.asPath.split('/')[1])
  }, [router.isReady])

  React.useEffect(() => {
    const initialize = async () => {
      const brandList = await productService.getBrands()
      setBrands(brandList)
    }

    initialize()
  }, [])

  return (
    <div>
      <header className="header shop">
        {/* Topbar */}
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-12">
                {/* Top Left */}
                <div className="top-left">
                  <ul className="list-main">
                    <li>
                      <i className="ti-headphone-alt" /> +060 (800) 801-582
                    </li>
                    <li>
                      <i className="ti-email" /> support@shophub.com
                    </li>
                  </ul>
                </div>
                {/*/ End Top Left */}
              </div>
              <div className="col-lg-7 col-md-12 col-12">
                {/* Top Right */}
                <div className="right-content">
                  <ul className="list-main">
                    <li>
                      <i className="ti-location-pin" /> Store location
                    </li>
                    <li>
                      <i className="ti-alarm-clock" /> <a href="#">Daily deal</a>
                    </li>
                    {
                      isNil(currentUser)
                        ? (
                          <li>
                            <i className="ti-power-off" />
                            <Link href="/sign-in">
                              <a href="/sign-in">Sign In</a>
                            </Link>
                          </li>
                        ) : (
                          <ul>
                            <li>
                              <i className="ti-user" />
                              <Link href="/my-profile">
                                <a href="#">{currentUser?.firstName}</a>
                              </Link>
                            </li>
                            <li>
                              <i className="ti-power-off" />
                              <Link href="/sign-out">
                                <a href="#">Sign out</a>
                              </Link>
                            </li>
                          </ul>
                        )
                    }
                  </ul>
                </div>
                {/* End Top Right */}
              </div>
            </div>
          </div>
        </div>
        {/* End Topbar */}
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-12">
                {/* Logo */}
                <div className="logo">
                  <Link href="/">
                    <a href="index.html">
                      <img src="images/logo.png" alt="logo" />
                    </a>
                  </Link>
                </div>
                {/*/ End Logo */}
                {/* Search Form */}
                <div className="search-top">
                  <div className="top-search">
                    <a href="#0">
                      <i className="ti-search" />
                    </a>
                  </div>
                  {/* Search Form */}
                  <div className="search-top">
                    <form className="search-form">
                      <input type="text" placeholder="Search here..." name="search" />
                      <button value="search" type="submit">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                  {/*/ End Search Form */}
                </div>
                {/*/ End Search Form */}
                <div className="mobile-nav" />
              </div>
              <div className="col-lg-8 col-md-7 col-12">
                <div className="search-bar-top">
                  <div className="search-bar">
                    <select>
                      <option defaultValue="selected">All Brands</option>
                      <option>watch</option>
                      <option>mobile</option>
                      <option>kid’s item</option>
                    </select>
                    <form>
                      <input name="search" placeholder="Search Products Here....." type="search" />
                      <button className="btnn">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <div className="right-bar" style={{ visibility: isSignedIn ? 'visible' : 'hidden' }}>
                  {/* Search Form */}
                  <div className="sinlge-bar">
                    <a href="#" className="single-icon">
                      <i className="fa fa-heart-o" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="sinlge-bar">
                    <a href="#" className="single-icon">
                      <i className="fa fa-user-circle-o" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="sinlge-bar shopping">
                    <a href="#" className="single-icon">
                      <i className="ti-bag" /> <span className="total-count">2</span>
                    </a>
                    {/* Shopping Item */}
                    <div className="shopping-item">
                      <div className="dropdown-cart-header">
                        <span>2 Items</span>
                        <Link href="/cart">
                          <a href="#">View Cart</a>
                        </Link>
                      </div>
                      <ul className="shopping-list">
                        <li>
                          <a href="#" className="remove" title="Remove this item">
                            <i className="fa fa-remove" />
                          </a>
                          <a className="cart-img" href="#">
                            <img src="https://via.placeholder.com/70x70" alt="#" />
                          </a>
                          <h4>
                            <a href="#">Woman Ring</a>
                          </h4>
                          <p className="quantity">
                            1x - <span className="amount">$99.00</span>
                          </p>
                        </li>
                        <li>
                          <a href="#" className="remove" title="Remove this item">
                            <i className="fa fa-remove" />
                          </a>
                          <a className="cart-img" href="#">
                            <img src="https://via.placeholder.com/70x70" alt="#" />
                          </a>
                          <h4>
                            <a href="#">Woman Necklace</a>
                          </h4>
                          <p className="quantity">
                            1x - <span className="amount">$35.00</span>
                          </p>
                        </li>
                      </ul>
                      <div className="bottom">
                        <div className="total">
                          <span>Total</span>
                          <span className="total-amount">$134.00</span>
                        </div>
                        <a href="checkout.html" className="btn animate">
                          Checkout
                        </a>
                      </div>
                    </div>
                    {/*/ End Shopping Item */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Inner */}
        <div className="header-inner">
          <div className="container">
            <div className="cat-nav-head">
              <div className="row">
                <div className="col-lg-3">
                  <div className="all-category" style={{ backgroundColor: showBrandDropdown ? '#F7941D' : '#333333' }}>
                    <h3 className="cat-heading" onClick={toggleBrandDropdown}>
                      {
                        showBrandDropdown
                          ? <i className="fa fa-times" aria-hidden="true"></i>
                          : <i className="fa fa-bars" aria-hidden="true" />
                      }
                      BRANDS
                    </h3>
                    {
                      showBrandDropdown
                        ? <Dropdown data={brands} onClick={toggleBrandDropdown}/>
                        : null
                    }
                  </div>
                </div>
                <div className="col-lg-9 col-12">
                  <div className="menu-area">
                    {/* Main Menu */}
                    <nav className="navbar navbar-expand-lg">
                      <div className="navbar-collapse">
                        <div className="nav-inner">
                          <ul className="nav main-menu menu navbar-nav">
                            <li className={currentPath === '' ? 'active' : ''}>
                              {/* <li className="active"> */}
                              <Link href="/">
                                <a href="#">Home</a>
                              </Link>
                            </li>
                            <li className={currentPath === 'product' ? 'active' : ''}>
                              <Link href="/product">Product</Link>
                            </li>
                            <li>
                              <a href="#">Service</a>
                            </li>
                            <li>
                              <a href="#">
                                Shop
                                <i className="ti-angle-down" />
                                <span className="new">New</span>
                              </a>
                              <ul className="dropdown">
                                <li>
                                  <Link href="/cart">
                                    <a href="cart.html">Cart</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/checkout">
                                    <a href="checkout.html">Checkout</a>
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="#">Pages</a>
                            </li>
                            <li>
                              <a href="#">
                                Blog
                                <i className="ti-angle-down" />
                              </a>
                              <ul className="dropdown">
                                <li>
                                  <a href="blog-single-sidebar.html">Blog Single Sidebar</a>
                                </li>
                              </ul>
                            </li>
                            <li className={currentPath === 'contact' ? 'active' : ''}>
                              <Link href="/contact">
                                <a href="contact">Contact Us</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                    {/*/ End Main Menu */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ End Header Inner */}
      </header>
    </div>
  )
})
