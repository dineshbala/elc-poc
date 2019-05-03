<?php
require 'config.php';
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->post('/login','login'); /* User login */
$app->post('/signup','signup'); /* User Signup  */
$app->post('/productlist','productlist'); /* Product List  */
$app->post('/productCategory','productCategory'); /* Product Category  */
$app->post('/addtocart','addtocart'); /* addtocart  */
$app->post('/cartproducts','cartproducts'); /* cartproducts  */
$app->post('/quantityupdate','quantityupdate'); /* cartproducts  */
$app->post('/removeproduct','removeproduct'); /* cartproducts  */
$app->post('/shippingaddress','shippingaddress'); /* cartproducts  */
$app->post('/paymentsubmit','paymentsubmit'); /* cartproducts  */
$app->post('/orderhistory','orderhistory'); /* cartproducts  */


$app->run();

/************************* USER LOGIN *************************************/
/* ### User login ### */
function login() {
    
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    
    try {
        
        $db = getDB();
        $userData ='';
        $sql = "SELECT user_id, firstname, lastname, mobile, email FROM users WHERE email=:email and password=:password ";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $data->email, PDO::PARAM_STR);
        $password=hash('sha256',$data->password);
        $stmt->bindParam("password", $password, PDO::PARAM_STR);
        $stmt->execute();
        $mainCount=$stmt->rowCount();
        $userData = $stmt->fetch(PDO::FETCH_OBJ);
        
        if(!empty($userData))
        {
            $user_id=$userData->user_id;
            $userData->token = apiToken($user_id);
        }
        
        $db = null;
         if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Please enter correct Email and Password"}}';
            }    
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


/* ### User registration ### */
function signup() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $firstname=$data->firstname;
    $lastname=$data->lastname;
    $mobile=$data->mobile;
    $email=$data->email;
    $password=$data->password;
    
    
    try {

        if (isset($email) && $email!="" && isset($password) && $password!="")
        {
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM users WHERE email=:email";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $email,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {
                /*Inserting user values*/
                $sql1="INSERT INTO users(firstname,lastname,mobile,email,password)VALUES(:firstname,:lastname,:mobile,:email,:password)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("firstname", $firstname,PDO::PARAM_STR);
                $stmt1->bindParam("lastname", $lastname,PDO::PARAM_STR);
                $stmt1->bindParam("mobile", $mobile,PDO::PARAM_STR);
                $stmt1->bindParam("email", $email,PDO::PARAM_STR);
                $password=hash('sha256',$data->password);
                $stmt1->bindParam("password", $password,PDO::PARAM_STR);
                $stmt1->execute();
                $userData=internalUserDetails($email); 
            }
            
            $db = null;
         
            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid data1"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Enter valid data2"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function email() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $email=$data->email;

    try {
       
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);  
        if (strlen(trim($email))>0 && $email_check>0)
        {
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM emailUsers WHERE email=:email";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $email,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {                
                /*Inserting user values*/
                $sql1="INSERT INTO emailUsers(email)VALUES(:email)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("email", $email,PDO::PARAM_STR);
                $stmt1->execute();               
            }
            $userData=internalEmailDetails($email);
            $db = null;
            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }
        }
        else{
            echo '{"error":{"text":"Enter valid data"}}';
        }
    }
    
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


/* ### internal Username Details ### */
function internalUserDetails($input) {
    
    try {
        $db = getDB();
        $sql = "SELECT user_id, firstname, lastname, mobile, email FROM users WHERE email=:input";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("input", $input,PDO::PARAM_STR);
        $stmt->execute();
        $usernameDetails = $stmt->fetch(PDO::FETCH_OBJ);
        $usernameDetails->token = apiToken($usernameDetails->user_id);
        $db = null;
        return $usernameDetails;        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }  
    
}

function productlist(){
    $request = \Slim\Slim::getInstance()->request();   
	$final_products =array();
	$array_sku = array();
	$usersList_array = array();

    try {
        $productData = '';
        $db = getDB();
        $sql = "SELECT * FROM tbl_products where status=1";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $products_array = $stmt->fetchAll(PDO::FETCH_OBJ);
		foreach($products_array  as $array_values){
			$final_products['id'] = $array_values->id;
			$final_products['PROD_RGN_NAME'] = $array_values->PROD_RGN_NAME;
			$final_products['priceRange'] = $array_values->priceRange;
			$final_products['ATTRIBUTE_DESC_1'] = $array_values->ATTRIBUTE_DESC_1;
			$final_products['DESCRIPTION'] = $array_values->DESCRIPTION;
			$final_products['ATTRIBUTE_CONCERN'] = $array_values->ATTRIBUTE_CONCERN;
			$final_products['ATTRIBUTE_BENEFIT'] = $array_values->ATTRIBUTE_BENEFIT;
			$final_products['ATTRIBUTE_DESC_3'] = $array_values->ATTRIBUTE_DESC_3;
			$final_products['MPP_DESC_2'] = $array_values->MPP_DESC_2;
			$final_products['ATTRIBUTE_DESC_4'] = $array_values->ATTRIBUTE_DESC_4;
			$final_products['ATTRIBUTE_DESC_5'] = $array_values->ATTRIBUTE_DESC_5;
			$final_products['ATTRIBUTE_COLLECTION'] = $array_values->ATTRIBUTE_COLLECTION;
			$final_products['url'] = $array_values->url;
			$final_products['SKIN_CONCERN_ATTR'] = $array_values->SKIN_CONCERN_ATTR;
			$final_products['MPP_DESC_1'] = $array_values->MPP_DESC_1;
			$final_products['ATTRIBUTE_LABEL_4'] = $array_values->ATTRIBUTE_LABEL_4;
			$final_products['MPP_LABEL_2'] = $array_values->MPP_LABEL_2;
			$final_products['shaded'] = $array_values->shaded;
			$final_products['PROD_CAT_DISPLAY_ORDER'] = $array_values->PROD_CAT_DISPLAY_ORDER;
			$final_products['PARENT_CAT_ID'] = $array_values->PARENT_CAT_ID;
			$final_products['PRODUCT_DETAILS_MOBILE'] = $array_values->PRODUCT_DETAILS_MOBILE;
			$final_products['ATTRIBUTE_LABEL_1'] = $array_values->ATTRIBUTE_LABEL_1;
			$final_products['MAKEUP_BENEFIT'] = $array_values->MAKEUP_BENEFIT;
			$final_products['DEFAULT_CAT_ID'] = $array_values->DEFAULT_CAT_ID;
			$final_products['ATTRIBUTE_SKINTYPE'] = $array_values->ATTRIBUTE_SKINTYPE;
			$final_products['ATTRIBUTE_LABEL_3'] = $array_values->ATTRIBUTE_LABEL_3;
			$final_products['sized'] = $array_values->sized;
			$final_products['ATTRIBUTE_LABEL_2'] = $array_values->ATTRIBUTE_LABEL_2;
			$final_products['SKINTYPE_DESC'] = $array_values->SKINTYPE_DESC;
			$final_products['PRODUCT_ID'] = $array_values->PRODUCT_ID;
			$final_products['ATTRIBUTE_LABEL_5'] = $array_values->ATTRIBUTE_LABEL_5;
			$final_products['skus'] = array();
			$final_products['SHORT_DESC'] = $array_values->SHORT_DESC;
			$final_products['SKIN_CONCERN_1'] = $array_values->SKIN_CONCERN_1;
			$final_products['SKIN_CONCERN_3'] = $array_values->SKIN_CONCERN_3;
			$final_products['PROD_RGN_SUBHEADING'] = $array_values->PROD_RGN_SUBHEADING;
			$final_products['RECOMMENDED_PERCENT'] = $array_values->RECOMMENDED_PERCENT;
			$final_products['ATTRIBUTE_DESC_2'] = $array_values->ATTRIBUTE_DESC_2;
			$final_products['PROD_BASE_ID'] = $array_values->PROD_BASE_ID;
			$final_products['defaultSku'] = array();

			$sql1 = "SELECT * FROM `tbl_product_skus` WHERE `PRODUCT_ID`='".$array_values->PRODUCT_ID."'";
			$stmt1 = $db->prepare($sql1);
			$stmt1->execute();
			$products_sku = $stmt1->fetchAll(PDO::FETCH_OBJ);	
			foreach($products_sku  as $array_sku_values){
				$array_sku['id']=$array_sku_values->id;
				$array_sku['PRODUCT_ID']=$array_sku_values->PRODUCT_ID;
				$array_sku['LARGE_SMOOSH']=$array_sku_values->LARGE_SMOOSH;
				$array_sku['isOrderable']=$array_sku_values->isOrderable;
				$array_sku['XS_SMOOSH']=$array_sku_values->XS_SMOOSH;
				$array_sku['SKIN_TYPE']=$array_sku_values->SKIN_TYPE;
				$array_sku['formattedPrice']=$array_sku_values->formattedPrice;
				$array_sku['PRODUCT_SIZE']=$array_sku_values->PRODUCT_SIZE;
				$array_sku['SKU_BASE_ID']=$array_sku_values->SKU_BASE_ID;
				$array_sku['MEDIUM_IMAGE']=$array_sku_values->MEDIUM_IMAGE;
				$array_sku['XL_IMAGE']=$array_sku_values->XL_IMAGE;
				$array_sku['SKU_ID']=$array_sku_values->SKU_ID;
				$array_sku['formattedPrice2']=$array_sku_values->formattedPrice2;
				$array_sku['formattedFuturePrice']=$array_sku_values->formattedFuturePrice;
				$array_sku['XL_SMOOSH']=$array_sku_values->XL_SMOOSH;
				$array_sku['DISPLAY_ORDER']=$array_sku_values->DISPLAY_ORDER;
				$array_sku['HEX_VALUE_STRING']=$array_sku_values->HEX_VALUE_STRING;
				$array_sku['SMALL_IMAGE']=$array_sku_values->SMALL_IMAGE;
				$array_sku['SMOOSH_PATH_STRING']=$array_sku_values->SMOOSH_PATH_STRING;
				$array_sku['LARGE_IMAGE']=$array_sku_values->LARGE_IMAGE;
				$array_sku['ATTRIBUTE_COLOR_FAMILY']=$array_sku_values->ATTRIBUTE_COLOR_FAMILY;
				$array_sku['ATTRIBUTE_FINISH']=$array_sku_values->ATTRIBUTE_FINISH;
				$array_sku['SHADENAME']=$array_sku_values->SHADENAME;
				$array_sku['FUTURE_PRICE']=$array_sku_values->FUTURE_PRICE;
				$array_sku['PRICE']=$array_sku_values->PRICE;
				$array_sku['SHADE_NUMBER']=$array_sku_values->SHADE_NUMBER;
				$array_sku['SHADE_DESCRIPTION']=$array_sku_values->SHADE_DESCRIPTION;
				$array_sku['INVENTORY_STATUS']=$array_sku_values->INVENTORY_STATUS;
				$array_sku['SKIN_TYPE_TEXT']=$array_sku_values->SKIN_TYPE_TEXT;
				array_push($final_products['skus'],$array_sku);
				    
					
			}
			
			$sql2 = "SELECT * FROM `tbl_product_skus` WHERE `PRODUCT_ID`='".$final_products['PRODUCT_ID']."' limit 1";
					$stmt2 = $db->prepare($sql2);
					$stmt2->execute();
					$products_sku1 = $stmt2->fetchAll(PDO::FETCH_OBJ);
					foreach($products_sku1  as $array_sku_values1){
				$array_sku1['id']=$array_sku_values1->id;
				$array_sku1['PRODUCT_ID']=$array_sku_values1->PRODUCT_ID;
				$array_sku1['LARGE_SMOOSH']=$array_sku_values1->LARGE_SMOOSH;
				$array_sku1['isOrderable']=$array_sku_values1->isOrderable;
				$array_sku1['XS_SMOOSH']=$array_sku_values1->XS_SMOOSH;
				$array_sku1['SKIN_TYPE']=$array_sku_values1->SKIN_TYPE;
				$array_sku1['formattedPrice']=$array_sku_values1->formattedPrice;
				$array_sku1['PRODUCT_SIZE']=$array_sku_values1->PRODUCT_SIZE;
				$array_sku1['SKU_BASE_ID']=$array_sku_values1->SKU_BASE_ID;
				$array_sku1['MEDIUM_IMAGE']=$array_sku_values1->MEDIUM_IMAGE;
				$array_sku1['XL_IMAGE']=$array_sku_values1->XL_IMAGE;
				$array_sku1['SKU_ID']=$array_sku_values1->SKU_ID;
				$array_sku1['formattedPrice2']=$array_sku_values1->formattedPrice2;
				$array_sku1['formattedFuturePrice']=$array_sku_values1->formattedFuturePrice;
				$array_sku1['XL_SMOOSH']=$array_sku_values1->XL_SMOOSH;
				$array_sku1['DISPLAY_ORDER']=$array_sku_values1->DISPLAY_ORDER;
				$array_sku1['HEX_VALUE_STRING']=$array_sku_values1->HEX_VALUE_STRING;
				$array_sku1['SMALL_IMAGE']=$array_sku_values1->SMALL_IMAGE;
				$array_sku1['SMOOSH_PATH_STRING']=$array_sku_values1->SMOOSH_PATH_STRING;
				$array_sku1['LARGE_IMAGE']=$array_sku_values1->LARGE_IMAGE;
				$array_sku1['ATTRIBUTE_COLOR_FAMILY']=$array_sku_values1->ATTRIBUTE_COLOR_FAMILY;
				$array_sku1['ATTRIBUTE_FINISH']=$array_sku_values1->ATTRIBUTE_FINISH;
				$array_sku1['SHADENAME']=$array_sku_values1->SHADENAME;
				$array_sku1['FUTURE_PRICE']=$array_sku_values1->FUTURE_PRICE;
				$array_sku1['PRICE']=$array_sku_values1->PRICE;
				$array_sku1['SHADE_NUMBER']=$array_sku_values1->SHADE_NUMBER;
				$array_sku1['SHADE_DESCRIPTION']=$array_sku_values1->SHADE_DESCRIPTION;
				$array_sku1['INVENTORY_STATUS']=$array_sku_values1->INVENTORY_STATUS;
				$array_sku1['SKIN_TYPE_TEXT']=$array_sku_values1->SKIN_TYPE_TEXT;
						array_push($final_products['defaultSku'],$array_sku1);
					}
					
			array_push($usersList_array,$final_products);
		}			
        $db = null;
        if($usersList_array)
            echo '{"productData": ' . json_encode($usersList_array) . '}';
        else
            echo '{"productData": ""}';        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function productCategory(){
    $request = \Slim\Slim::getInstance()->request();   
    try {
        $productCategory = '';
        $db = getDB();
        $sql = "SELECT * FROM tbl_category ORDER BY sortOrder asc LIMIT 8";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $productCategory = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        if($productCategory)
            echo '{"productCategory": ' . json_encode($productCategory) . '}';
        else
            echo '{"productCategory": ""}';        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addtocart(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
	$cartInsertData =array();
    
   // $userId=$data->userId;
    $PRODUCT_ID=$data->PRODUCT_ID;
    $SKU_ID=$data->SKU_ID;
    $Quantity=$data->qty;
	$orderNumber=$data->orderNumb;
	
    
    try {  
        
        if ($PRODUCT_ID!="")
        {
			if (isset($orderNumber) && $orderNumber!="") {
				 $orderNumber = $orderNumber;
			} else {
				$digits_needed=8;
				$random_number=''; // set up a blank string
				$count=0;
				while ( $count < $digits_needed ) {
					$random_digit = mt_rand(0, 9);
					$random_number .= $random_digit;
					$count++;
				}	
				$orderNumber = $random_number;
			}
            
            $db = getDB();
            /*if (isset($userId) && $userId!="") {
				 $userId = $userId;
                 
                 
            $sqlc = "SELECT * FROM tbl_orderHistory WHERE orderNumber=:orderNumber AND PRODUCT_ID=:PRODUCT_ID and SKU_ID=:SKU_ID";
            $stmtc = $db->prepare($sqlc);
            $stmtc->bindParam("orderNumber", $orderNumber,PDO::PARAM_STR);
            $stmtc->bindParam("PRODUCT_ID", $PRODUCT_ID,PDO::PARAM_STR);
            $stmtc->bindParam("SKU_ID", $SKU_ID,PDO::PARAM_STR);
			$stmtc->execute();
            $orderCnt=$stmtc->rowCount();
                 
			}*/
			
            $sql = "SELECT * FROM tbl_orderHistory WHERE orderNumber=:orderNumber AND PRODUCT_ID=:PRODUCT_ID and SKU_ID=:SKU_ID";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("orderNumber", $orderNumber,PDO::PARAM_STR);
            $stmt->bindParam("PRODUCT_ID", $PRODUCT_ID,PDO::PARAM_STR);
            $stmt->bindParam("SKU_ID", $SKU_ID,PDO::PARAM_STR);
			$stmt->execute();
            $productCnt=$stmt->rowCount();
            $created=time();
            if($productCnt==0)
            {
                /*Inserting cart values*/
               // $sql1="INSERT INTO tbl_orderHistory(userId,orderNumber,PRODUCT_ID,SKU_ID,Quantity)VALUES(:userId,:orderNumber,:PRODUCT_ID,:SKU_ID,:Quantity)";
                $sql1="INSERT INTO tbl_orderHistory(orderNumber,PRODUCT_ID,SKU_ID,Quantity)VALUES(:orderNumber,:PRODUCT_ID,:SKU_ID,:Quantity)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("orderNumber", $orderNumber,PDO::PARAM_STR);
                $stmt1->bindParam("PRODUCT_ID", $PRODUCT_ID,PDO::PARAM_STR);
                $stmt1->bindParam("SKU_ID", $SKU_ID,PDO::PARAM_STR);
				$stmt1->bindParam("Quantity", $Quantity,PDO::PARAM_STR);
                $stmt1->execute();
				$cartInsertData['msg'] = "Product addedd successfully";
				$cartInsertData['orderNumber'] = $orderNumber;
            }else{
                /*Update cart values*/
                $sql1="UPDATE `tbl_orderHistory` SET Quantity = Quantity  WHERE orderNumber=:orderNumber AND PRODUCT_ID=:PRODUCT_ID and SKU_ID=:SKU_ID";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("orderNumber", $orderNumber,PDO::PARAM_STR);
                $stmt1->bindParam("PRODUCT_ID", $PRODUCT_ID,PDO::PARAM_STR);
                $stmt1->bindParam("SKU_ID", $SKU_ID,PDO::PARAM_STR);
                $stmt1->execute();
				$cartInsertData['msg'] = "Product updated successfully";
				$cartInsertData['orderNumber'] = $orderNumber;			
			}
            
            $db = null;
         
            if($cartInsertData){
               $cartInsertData = json_encode($cartInsertData);
                echo '{"cartInsertData": ' .$cartInsertData . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Enter valid datas"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
	
}


function cartproducts(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
	 $orderNumber=$data->orderNumb;
	    
    try {          
        if ($orderNumber!="")
        {			
            $db = getDB();
            $sql = "SELECT * FROM tbl_orderHistory WHERE orderNumber=:orderNumber";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("orderNumber", $orderNumber,PDO::PARAM_STR);
			$stmt->execute();
            $productCnt=$stmt->rowCount();
            $created=time();
            if($productCnt==0){
				$cartProduct['msg'] = "Your cart is Empty";
            }else{
                /*Update cart values*/
                $sql1="SELECT * FROM tbl_orderhistory a INNER JOIN tbl_product_skus b ON a.SKU_ID = b.SKU_ID INNER JOIN tbl_products c ON a.PRODUCT_ID = c.PRODUCT_ID WHERE a.orderNumber =:orderNumber";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("orderNumber", $orderNumber,PDO::PARAM_STR);
                $stmt1->execute();
				$cartprod = $stmt1->fetchAll(PDO::FETCH_OBJ);				
			}
            
            $db = null;
            if($cartprod){
               $cartprod = json_encode($cartprod);
                echo '{"cartprod": ' .$cartprod. '}';
            } else {
               echo '{"error":{"text":"Your cart is Empty1"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Your cart is Empty2"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
	
}

function quantityupdate(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $SKU_ID='SKU'.$data->SKU_ID;
    $Quantity=$data->qty;
	$orderNumber=$data->orderNumb;
    
    try {         
        if ($SKU_ID!="")
        {
                $db = getDB();
                /*Update cart values*/
                $sql1="UPDATE `tbl_orderHistory` SET Quantity = '".$Quantity."'  WHERE orderNumber='".$orderNumber."' AND SKU_ID='".$SKU_ID."'";
                $stmt1 = $db->prepare($sql1);
                $stmt1->execute();
				$quantityupdate['msg'] = "Product updated successfully";
				$quantityupdate['orderNumber'] = $orderNumber;			
            
                $db = null;
         
            if($quantityupdate){
               $quantityupdate = json_encode($quantityupdate);
                echo '{"quantityupdate": ' .$quantityupdate . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Enter valid datas"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }	
}

function removeproduct(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $SKU_ID='SKU'.$data->SKU_ID;
	$orderNumber=$data->orderNumb;
    
    try {         
        if ($SKU_ID!="")
        {
                $db = getDB();
                /*Update cart values*/
                $sql1="DELETE FROM `tbl_orderhistory` WHERE orderNumber='".$orderNumber."' AND SKU_ID='".$SKU_ID."'";
                $stmt1 = $db->prepare($sql1);
                $stmt1->execute();
				$removeproduct['msg'] = "Product removed successfully";
				$removeproduct['orderNumber'] = $orderNumber;			
            
                $db = null;
         
            if($removeproduct){
               $removeproduct = json_encode($removeproduct);
                echo '{"removeproduct": ' .$removeproduct . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Enter valid datas"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }	
}

function shippingaddress(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $address1=$data->address1;
    $address2=$data->address2;
	$zipcode=$data->zipcode;
    $country=$data->country;
    $state=$data->state;
    $ordernotes=$data->ordernotes;
    
    try {         
        if ($user_id!="")
        {
                $db = getDB();
                /*Update cart values*/
                $sql1="UPDATE `users` SET shippingAddress1 = '".$address1."', shippingAddress2 = '".$address2."', shippingZipcode = '".$zipcode."', shippingCountry = '".$country."', shippingState = '".$state."', shippingNotes = '".$ordernotes."'  WHERE user_id='".$user_id."'";
                $stmt1 = $db->prepare($sql1);
                $stmt1->execute();
				$shippingaddress['msg'] = "Shipping address updated successfully";
				$shippingaddress['orderNumber'] = $orderNumber;			
            
                $db = null;
         
            if($shippingaddress){
               $shippingaddress = json_encode($shippingaddress);
                echo '{"shippingaddress": ' .$shippingaddress . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Enter valid datas"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }	
}

function paymentsubmit(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $orderNumber=$data->orderNumb;
    $orderStatus='Completed';
	$paymentMethod='CreditCard';
    $paymentStatus='Completed';
    $cardNumber=$data->creditcard;
    $cardExpMonth=$data->month;
    $cardExpYear=$data->year;
    $cardCvv=$data->cvv;
    
    try {         
        if (isset($user_id) && $user_id!="" && isset($orderNumber) && $orderNumber!="")
        {
                $db = getDB();
                /*Update cart values*/
                $sql1="INSERT INTO `tbl_ordertable` (`user_id`, `orderNumber`, `orderStatus`, `paymentMethod`, `paymentStatus`, `cardNumber`, `cardExpMonth`, `cardExpYear`, `cardCvv`) VALUES ('".$user_id."', '".$orderNumber."', '".$orderStatus."', '".$paymentMethod."', '".$paymentStatus."', '".$cardNumber."', '".$cardExpMonth."', '".$cardExpYear."', '".$cardCvv."')";
                $stmt1 = $db->prepare($sql1);
                $stmt1->execute();
				$paymentsubmit['msg'] = "Ordered successfully";
				$paymentsubmit['orderNumber'] = $orderNumber;			
            
                $db = null;
         
            if($paymentsubmit){
               $paymentsubmit = json_encode($paymentsubmit);
                echo '{"paymentsubmit": ' .$paymentsubmit . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }        
        }
        else{
            echo '{"error":{"text":"Enter valid datas"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }	
}

function orderhistory(){
	$request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
	$user_id=$data->user_id;
    //$user_id= 1;
	    
    try {          
        if ($user_id!="")
        {			
            $db = getDB();
            $sql = "SELECT * FROM tbl_ordertable WHERE user_id=:user_id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id,PDO::PARAM_STR);
			$stmt->execute();
            $productCnt=$stmt->rowCount();
            $created=time();
            if($productCnt==0){
				$cartProduct['msg'] = "No orders found";
            }else{
                /*Update cart values*/
                $sql1="SELECT * FROM tbl_ordertable WHERE user_id =:user_id";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("user_id", $user_id,PDO::PARAM_STR);
                $stmt1->execute();
				$orderhistory = $stmt1->fetchAll(PDO::FETCH_OBJ);				
			}
            
            $db = null;
            if($orderhistory){
               $orderhistory = json_encode($orderhistory);
                echo '{"orderhistory": ' .$orderhistory. '}';
            } else {
               echo '{"error":{"text":"No orders found"}}';
            }        
        }
        else{
            echo '{"error":{"text":"No orders found"}}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
	
}

?>
