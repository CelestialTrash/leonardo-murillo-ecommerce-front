import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import RightPanel from "../components/RightPanel/RightPanel";
import ProductInfo from "../components/RightPanel/ProductInfo";
import MaterialSelector from "../components/MaterialSelector/MaterialSelector";
import CordColorSelector from "../components/CordColorSelector/CordColorSelector";
import SwitchTypeSelector from "../components/SwitchTypeSelector/SwitchTypeSelector";
import AddToCartButton from "../components/AddToCartButton/AddToCartButton";
import DimensionInfo from "../components/DimensionInfo/DimensionInfo";
import MaterialComparisonTable from "../components/MaterialComparisonTable/MaterialComparisonTable";
import CartButton from "../components/CartButton/CartButton";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import "../styles/ProductPage.css";

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2021-10-21",
  useCdn: true,
});

const ProductPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductInfo] = useState({});
  const [pricesByMaterial, setPricesByMaterial] = useState([]); // Correct initialization
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [cordColors, setCordColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [switchTypes, setSwitchTypes] = useState([]);
  const [selectedSwitch, setSelectedSwitch] = useState("");
  const [dimensions, setDimensions] = useState(null);
  const [careInstructions, setCareInstructions] = useState("");
  const [materialComparison, setMaterialComparison] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product"][0]{ 
          images[] { asset-> { url } }, 
          name, 
          description, 
          pricesByMaterial[] { material, price },
          cordColors, 
          switchTypes,
          dimensions { total, shade, cordLength },
          careInstructions,
          materialComparison[] { aluminum, stainlessSteel }
        }`
      )
      .then((data) => {
        if (data) {
          setImages(data.images ? data.images.map((image) => image.asset.url) : []);
          setProductInfo({
            name: data.name,
            description: data.description,
          });
          setPricesByMaterial(data.pricesByMaterial || []); // Ensure proper initialization
          setCordColors(data.cordColors || []);
          setSwitchTypes(data.switchTypes || []);
          setDimensions(data.dimensions || null);
          setCareInstructions(data.careInstructions || "");
          setMaterialComparison(data.materialComparison || []);

          if (data.pricesByMaterial?.length > 0) {
            setSelectedMaterial(data.pricesByMaterial[0]); // Initialize with the first material
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching product data from Sanity:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
    setShowCheckout(false);
  };

  const startCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const cancelCheckout = () => setShowCheckout(false);

  return (
    <div className="product-page-container">
      <div className="carousel-container">
        {isLoading ? (
          <p>Loading images...</p>
        ) : (
          <ProductCarousel images={images} />
        )}
      </div>
      <RightPanel>
        <div className="header-with-cart">
          <CartButton onClick={toggleCart} isCartOpen={showCart} />
          {!showCart && !showCheckout && (
            <ProductInfo
            name={productInfo.name}
            price={selectedMaterial?.price || 0}
            description={productInfo.description}
            />
          )}
        </div>

        {showCheckout && <Checkout onCancel={cancelCheckout} />}
        {showCart && !showCheckout && <Cart onCheckout={startCheckout} />}
        {!showCart && !showCheckout && (
          <>
            <MaterialSelector
              materials={pricesByMaterial}
              onMaterialSelect={setSelectedMaterial}
            />
            <CordColorSelector
              colors={cordColors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
            <SwitchTypeSelector
              switchTypes={switchTypes}
              selectedSwitch={selectedSwitch}
              onSwitchSelect={setSelectedSwitch}
            />
            <AddToCartButton
              product={productInfo}
              selectedMaterial={selectedMaterial}
              selectedColor={selectedColor}
              selectedSwitch={selectedSwitch}
              pricesByMaterial={pricesByMaterial} // Ensure this prop is passed
            />
            <DimensionInfo
              dimensions={dimensions}
              careInstructions={careInstructions}
            />
            <MaterialComparisonTable materialComparison={materialComparison} />
          </>
        )}
      </RightPanel>
    </div>
  );
};

export default ProductPage;
