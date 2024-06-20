// import {
//   Banner,
//   useApi,
//   useTranslate,
//   reactExtension,
//   useStorage
// } from '@shopify/ui-extensions-react/checkout';

// export default reactExtension(
//   'purchase.checkout.block.render',
//   () => <Extension />,
// );

// function Extension() {
//   const translate = useTranslate();
//   const { extension } = useApi();
//   const storage = useStorage();
//   // localStorage.setItem("outOfStockProduct", true);
//   storage.setItem('outOfStockProduct', 'true');


//   // const localValue = localStorage.getItem("outOfStockProduct");
//   const localValue = storage.getItem('outOfStockProduct');
//   if(localValue){ 
//     console.log("zunair is working on teh exte");
//   }

//   return (
    
//     <Banner title="checkout-ui-ethelm">
//       {translate('welcome', {target: extension.target})}
//     </Banner>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  Banner,
  reactExtension,
  useTranslate,
  useExtensionApi,
  useStorage,
  useDeliveryGroups
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useExtensionApi();
  const { write, read } = useStorage();

  let shipping = useDeliveryGroups();

//here you got all the information about shipping in shipping variable 
  console.log("shopiifng", shipping);

  useEffect(() => {
    async function manageStorage() {
      try {
        // Write a value to storage
        await write('outOfStockProduct', true);

        // Read the value from storage
        const localValue = await read('outOfStockProduct');

        if (localValue) {
          console.log('Zunair is working on the extension');
          setShowRushShipping(false);
        }
      } catch (error) {
        console.error('Error managing storage:', error);
      }
    }

    manageStorage();
  }, [write, read]);

  return (
    <div>
      <Banner title="checkout-ui-ethelm">
        {translate('welcome', { target: extension.target })}
      </Banner>
    </div>
  );
}
