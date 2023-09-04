import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import Sidebar from '@/components/frontend/home/sidebar/Sidebar';
import HeroSection from '@/components/frontend/home/HeroSection';
import NewProduct from '@/components/frontend/home/new-products';
import TwoColumnBanner from '@/components/frontend/home/two-column-banner';
import FeatureProduct from '@/components/frontend/home/featured-products';
import MiddleBanner from '@/components/frontend/home/middle-banner';
import Categorywise from '@/components/frontend/home/categorywise';
import InfoBoxes from '@/components/frontend/home/info-boxes';
import Brandwise from '@/components/frontend/home/brandwise';
import BestSeller from '@/components/frontend/home/best-seller';
import BlogSlider from '@/components/frontend/home/blog-slider';
import CustomStyles from '@/components/frontend/CustomStyles';
import CustomScripts from '@/components/frontend/CustomScript';
import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';

const Home = () => {
  return (
    <div>
      <CustomStyles />
      <Header />
      <div className="body-content outer-top-xs" id="top-banner-and-menu">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-xs-12 col-sm-12 col-md-9 homebanner-holder">
              <HeroSection />
              <InfoBoxes />
              <NewProduct />
              <TwoColumnBanner />
              <FeatureProduct />
              <MiddleBanner />

              <Categorywise />
              <Brandwise />
              <BestSeller />
              <BlogSlider />
              <new-arrivals></new-arrivals>

            </div>
          </div>
          <brands-carousel></brands-carousel>
        </div>
      </div>
      <CustomScripts />
      <Footer />
    </div>
  );
};

export default Home;
