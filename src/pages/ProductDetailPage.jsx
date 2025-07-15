import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, deleteProduct, createProductRating, getMyRatingForProduct, getProductRatings } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { Grid, Box, Typography, Button, CircularProgress, Paper, Divider, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PRODUCTS_SERVER_URL } from '../config';
import RatingDisplay from '../components/RatingDisplay';
import StarRatingComponent from '../components/StarRatingComponent';
import CommentsModal from '../components/CommentsModal';

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myRating, setMyRating] = useState(null);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const { productId } = useParams();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const data = await getProductById(productId);
          setProduct(data);
          
          // Si el usuario está logueado, obtener su calificación para este producto
          if (isLoggedIn) {
            try {
              const userRating = await getMyRatingForProduct(productId);
              setMyRating(userRating);
            } catch (err) {
              // Usuario no ha calificado este producto, es normal
              setMyRating(null);
            }
          }
        } catch (err) {
          setError('No se pudo cargar el producto.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, isLoggedIn]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.")) {
      try {
        await deleteProduct(productId);
        alert("¡Producto eliminado con éxito!");
        navigate('/');
      } catch (err) {
        console.error(err);
        alert(err.detail || "Error al eliminar el producto.");
      }
    }
  };

  const handleRatingSubmitted = async (productId, ratingData) => {
    try {
      console.log('🔍 ProductDetailPage - handleRatingSubmitted iniciado:', {
        productId,
        ratingData,
        isLoggedIn,
        user: user ? { id: user.id || user._id, email: user.email } : null
      });

      const newRating = await createProductRating(productId, ratingData);
      
      console.log('✅ ProductDetailPage - createProductRating exitoso:', newRating);
      
      setMyRating(newRating);
      
      // Actualizar el producto para reflejar la nueva calificación promedio
      const updatedProduct = await getProductById(productId);
      
      console.log('✅ ProductDetailPage - producto actualizado:', {
        oldAverage: product.average_rating,
        newAverage: updatedProduct.average_rating,
        oldTotal: product.total_ratings,
        newTotal: updatedProduct.total_ratings
      });
      
      setProduct(updatedProduct);
      
      return newRating;
    } catch (error) {
      console.error('❌ ProductDetailPage - Error en handleRatingSubmitted:', error);
      console.error('❌ ProductDetailPage - Error response:', error.response);
      console.error('❌ ProductDetailPage - Error data:', error.response?.data);
      throw error;
    }
  };

  const handleShowComments = async () => {
    if (product.total_ratings === 0) return;
    
    try {
      const ratingsData = await getProductRatings(productId);
      setComments(ratingsData);
      setCommentsModalOpen(true);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      // Abrir modal aunque falle para mostrar mensaje de error
      setComments([]);
      setCommentsModalOpen(true);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ mt: 5 }}>{error}</Typography>;
  if (!product) return <Typography align="center" sx={{ mt: 5 }}>Producto no encontrado.</Typography>;

  // Determinar si es URL externa o archivo local
  const isExternalUrl = product.image_url && (
    product.image_url.startsWith('http://') || 
    product.image_url.startsWith('https://') || 
    product.image_url.startsWith('data:')
  );

  const imageUrl = product.image_url
    ? (isExternalUrl ? product.image_url : `${PRODUCTS_SERVER_URL}${product.image_url}`)
    : `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}`;
  
  const whatsappNumber = product.whatsapp_number?.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, mt: 2, boxShadow: 'none' }}>
      <Grid container spacing={4}>

        {/* --- Columna de la Imagen (Izquierda) --- */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              height: { xs: 300, sm: 400, md: 500 },
              width: { xs: 250, sm: 400, md: 500 },
              border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden',
            }}
          >
            <Box component="img" src={imageUrl} alt={product.name}
              sx={{
                width: '100%',
                height: '100%', // <-- Le decimos que ocupe toda la altura del marco
                objectFit: 'cover', // <-- Cambiamos a 'cover' para que llene el espacio
              }}
            />
          </Box>
        </Grid>
        
        {/* --- Columna de los Detalles (Derecha) --- */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>{product.name}</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>Categoría: {product.category}</Typography>
              
              {/* Mostrar calificación promedio - clickeable para ver comentarios */}
              <Box sx={{ my: 2 }}>
                <RatingDisplay 
                  averageRating={product.average_rating} 
                  totalRatings={product.total_ratings}
                  showDetails={true}
                  clickable={true}
                  onClick={handleShowComments}
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph color="text.secondary">{product.description}</Typography>
              <Typography variant="h5" sx={{ my: 2 }}><strong>Stock disponible:</strong> {product.stock} unidades</Typography>
              <Typography variant="h3" color="primary.main" sx={{ my: 2, fontWeight: 'bold' }}>
                ${product.price ? product.price.toLocaleString('es-CO') : 'N/A'}
              </Typography>
            </Box>

            {/* VVVVVV SECCIÓN DE BOTONES CORREGIDA Y COMPLETA VVVVVV */}
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                color="success" 
                size="large" 
                startIcon={<WhatsAppIcon />} 
                sx={{ py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </Button>
              {isLoggedIn && user && product.owner_id && (product.owner_id === (user.id || user._id)) && (
                <Box sx={{ mt: 2, border: '1px dashed', borderColor: 'grey.400', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Acciones del Propietario:</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} to={`/products/edit/${product.id || product._id}`} variant="outlined" startIcon={<EditIcon />}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                      Eliminar
                    </Button>
                  </Stack>
                </Box>
              )}
              
              {/* Mensaje para usuarios no logueados */}
              {!isLoggedIn && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="body2" color="info.dark">
                    Inicia sesión para calificar este producto
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      
      {/* Mensaje para propietarios del producto */}
      {isLoggedIn && user && product.owner_id && (product.owner_id === (user.id || user._id)) && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" color="info.dark">
            📝 Este es tu producto. Los propietarios no pueden calificar sus propios productos.
          </Typography>
        </Box>
      )}

      {/* SECCIÓN DE CALIFICACIÓN CON ESTRELLAS Y COMENTARIOS */}
      {isLoggedIn && user && product.owner_id && (product.owner_id !== (user.id || user._id)) && (
        <StarRatingComponent
          productId={productId}
          currentRating={myRating}
          onRatingSubmitted={handleRatingSubmitted}
        />
      )}

      {/* Botones de TEST de conectividad */}
      {/* <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          color="primary" 
          size="small"
          onClick={async () => {
            console.log('🔍 INICIANDO TEST DE CONECTIVIDAD...');
            
            // Test 1: Verificar token
            const token = localStorage.getItem('accessToken'); // CLAVE CORREGIDA
            const tokenAlt = localStorage.getItem('access_token'); // CLAVE ALTERNATIVA
            console.log('🔑 Token (accessToken):', !!token);
            console.log('🔑 Token (access_token):', !!tokenAlt);
            if (token) {
              try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log('🔑 Token payload:', payload);
                console.log('🔑 Token expira:', new Date(payload.exp * 1000));
              } catch (e) {
                console.error('🔑 Error decodificando token:', e);
              }
            }
            
            // Test 2: Verificar servicios
            try {
              console.log('🌐 Testing Products Service...');
              const finalToken = token || tokenAlt; // Usar el token que esté disponible
              const response = await fetch('http://localhost:8001/api/v1/products/', {
                headers: {
                  'Authorization': `Bearer ${finalToken}`,
                  'Content-Type': 'application/json',
                },
              });
              console.log('🌐 Products Service response:', response.status, response.statusText);
              
              if (response.ok) {
                const data = await response.json();
                console.log('🌐 Products data sample:', data.slice(0, 2));
              }
            } catch (error) {
              console.error('🌐 Error conectando a Products Service:', error);
            }
            
            // Test 3: Test específico de rating
            try {
              console.log('⭐ Testing Rating endpoint...');
              const finalToken = token || tokenAlt; // Usar el token que esté disponible
              const testRatingData = {
                rating: 5,
                comment: "Test de conectividad"
              };
              
              const response = await fetch(`http://localhost:8001/api/v1/products/${productId}/ratings`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${finalToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(testRatingData)
              });
              
              console.log('⭐ Rating endpoint response:', response.status, response.statusText);
              const responseText = await response.text();
              console.log('⭐ Rating response body:', responseText);
              
              if (!response.ok) {
                let errorDetail = 'Sin detalles';
                try {
                  const errorData = JSON.parse(responseText);
                  errorDetail = JSON.stringify(errorData, null, 2);
                } catch (e) {
                  errorDetail = responseText;
                }
                
                console.error('⭐ Rating endpoint error details:', {
                  status: response.status,
                  statusText: response.statusText,
                  body: errorDetail,
                  sentData: testRatingData
                });
              } else {
                console.log('⭐ Rating endpoint SUCCESS!', responseText);
              }
            } catch (error) {
              console.error('⭐ Error en test de rating:', error);
            }
            
            console.log('🔍 TEST DE CONECTIVIDAD COMPLETADO - Revisa los logs arriba');
          }}
        >
          🔍 Test Conectividad Completo
        </Button>
        
        <Button 
          variant="outlined" 
          color="secondary" 
          size="small"
          onClick={() => {
            console.log('📋 ESTADO ACTUAL DEL COMPONENTE:');
            console.log('User:', user);
            console.log('Product:', product);
            console.log('ProductId:', productId);
            console.log('IsLoggedIn:', isLoggedIn);
            console.log('MyRating:', myRating);
            console.log('LocalStorage token:', localStorage.getItem('accessToken'));
          }}
        >
          📋 Log Estado
        </Button>
      </Box> */}
      
      {/* Modal de comentarios */}
      <CommentsModal
        open={commentsModalOpen}
        onClose={() => setCommentsModalOpen(false)}
        comments={comments}
        productName={product.name}
      />
    </Paper>
  );
}

export default ProductDetailPage;