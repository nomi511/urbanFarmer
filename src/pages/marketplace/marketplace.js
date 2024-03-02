import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Marketplace = () => {


    const [newProduct, setNewProduct] = useState(false)
    const [product, setProduct] = useState({})
    const [allProducts, setAllProducts] = useState([])
    
    const [user, setUser] = useState({})
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const { user } = JSON.parse(storedUser);
          setUser(user)

          setProduct((prev)=>({
            ...prev, userId:user._id
        }))
          console.log('User information from local storage:', { user });
        }
        
    }, []);



    const getMyProducts = () =>{
        const myProducts = allProducts.filter(itm=>(itm.userId===user._id));
        setAllProducts(myProducts)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct((prevData) => ({
          ...prevData,
          image: file,
        }));
    };

    

    const getAllProducts =async()=>{
        await axios.get(`http://localhost:5000/products/`, product, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => {
                  console.log(response.data)
                  setAllProducts(response.data)
              })
              .catch(error => {
                console.error('Error logging in', error);
        })
    }

    useEffect(() => {
        getAllProducts()
        
    }, []);




    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setProduct((prev) => ({
          ...prev,
          [name]: value,
        }));
    }




    const handleSave = async()=>{
        console.log(product)


        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('type', product.type);
        formData.append('image', product.image);



        await axios.post(`http://localhost:5000/products/`, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        }).then(response => {
                console.log(response.data)
            })
            .catch(error => {
              console.error('Error logging in', error);
        })


        setNewProduct(false)
    }


    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:5000/products/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
                console.log(response.data)
            })
            .catch(error => {
              console.error('Error logging in', error);
        })
    }


  return (
    <div className="marketplace">
        <h2>Marketplace</h2>
        <div className="marktet-top-nav">
            <button className='market-btn' onClick={()=>setNewProduct(true)}>Sell</button>
            <button className='market-btn' onClick={()=>{getMyProducts()}}>My products</button>
            <button className='market-btn' onClick={()=>{getAllProducts()}}>All products</button>
        </div>
        
        <div className='market-content'>
            {
                allProducts.map((itm)=>(
                    <div className='product-card'>
                        <img src={itm.image} alt='img' className="pr-img" />
                        <div className='pr-title'>{itm.name}</div>
                        <div className='pr-desc'>{itm.description}</div>
                        <div className='pr-price'>Rs.{itm.price}</div>
                        {
                            (user._id === itm.userId) && <div className='pr-delete' onClick={()=>handleDelete(itm._id)}>Delete</div>
                        }
                        
                        
                    </div>
                ))
            }
        </div>

        {newProduct&& <div className='new-product'>
            <h2>Add Item Details</h2>
            <div className='new-product-detail'>
                <label>Name:</label>
                <input type="text" name="name" className="new-product-val" value={product.name} onChange={handleInputChange} />
                <label>Description:</label>
                <input type="text" name="description" className="new-product-val" value={product.description} onChange={handleInputChange} />
                <label>Type:</label>
                <input type="text" name="type" className="new-product-val" value={product.type} onChange={handleInputChange} />
                <label>Price:</label>
                <input type="number" name="price" className="new-product-val" value={product.price} onChange={handleInputChange} />
                <label>Image:</label>
                <input type="file" name="image" className="new-product-val"  onChange={handleImageChange} />
               
            </div>         
            <div>
                <button onClick={()=>handleSave()} className='market-btn' style={{marginTop:'50px'}}>Save</button>
                <button onClick={()=>setNewProduct(false)} className='market-btn' style={{marginLeft:'50px'}}>Cancel</button>
            </div>
        </div>}
    </div>
  )
}

export default Marketplace