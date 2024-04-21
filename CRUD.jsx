import React, { useState, useEffect, Fragment } from 'react';
import { Table, TableRow, TableCell, TableHead, TableBody, Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CRUD = () => {
   const [showAdd, setShowAdd] = useState(false);
   const [showEdit, setShowEdit] = useState(false);
   const [product, setProduct] = useState('');
   const [description, setDescription] = useState('');
   const [editID, setEditID] = useState(null);
   const [data, setData] = useState([
      {
         id: 1,
         Product: "iPhone11",
         Description: "the smartphone",
         Created: "2021-03-07 10:06:28"
      }
   ]);

   const handleShowAdd = () => {
      setProduct('');
      setDescription('');
      setShowAdd(true);
   }

   const handleShowEdit = (id) => {
      const productToEdit = data.find(item => item.id === id);
      setEditID(id);
      setProduct(productToEdit.Product);
      setDescription(productToEdit.Description);
      setShowEdit(true);
   }

   const handleConfirmAdd = () => {
      const newProduct = {
         id: Math.floor(Math.random() * 1000) + 1,
         Product: product,
         Description: description,
         Created: new Date().toLocaleString() // Current date and time
      };
      setData([...data, newProduct]);
      setShowAdd(false);
   }

   const handleConfirmEdit = () => {
      const updatedData = data.map(item => {
         if (item.id === editID) {
            return {
               ...item,
               Product: product,
               Description: description,
               Created: new Date().toLocaleString() // Update date and time
            };
         }
         return item;
      });
      setData(updatedData);
      setProduct('');
      setDescription('');
      setEditID(null);
      setShowEdit(false);
   }

   const handleDelete = (id) => {
      if (window.confirm("Are you sure to delete this product?")) {
         const updatedData = data.filter(item => item.id !== id);
         setData(updatedData);
      }
   }

   return (
      <Fragment>
         <Button variant="contained" onClick={handleShowAdd} style={{ marginBottom: '1rem' }}>Add Product</Button>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>SN</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {
                  data.map((item, index) => (
                     <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.Product}</TableCell>
                        <TableCell>{item.Description}</TableCell>
                        <TableCell>{item.Created}</TableCell>
                        <TableCell>
                           <Button variant='contained' onClick={() => handleShowEdit(item.id)}>Edit</Button>{' '}
                           <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </TableCell>
                     </TableRow>
                  ))
               }
            </TableBody>
         </Table>
         <Dialog open={showAdd} onClose={() => setShowAdd(false)}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
               <TextField 
                  label="Product Name" 
                  variant="outlined" 
                  value={product} 
                  onChange={(e) => setProduct(e.target.value)} 
                  fullWidth 
                  margin="normal" 
               />
               <TextField 
                  label="Description" 
                  variant="outlined" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  fullWidth 
                  margin="normal" 
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setShowAdd(false)}>Cancel</Button>
               <Button onClick={handleConfirmAdd} color="primary">Confirm</Button>
            </DialogActions>
         </Dialog>
         <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
               <TextField 
                  label="Product Name" 
                  variant="outlined" 
                  value={product} 
                  onChange={(e) => setProduct(e.target.value)} 
                  fullWidth 
                  margin="normal" 
               />
               <TextField 
                  label="Description" 
                  variant="outlined" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  fullWidth 
                  margin="normal" 
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setShowEdit(false)}>Cancel</Button>
               <Button onClick={handleConfirmEdit} color="primary">Confirm</Button>
            </DialogActions>
         </Dialog>
      </Fragment>
   )
}

export default CRUD;
