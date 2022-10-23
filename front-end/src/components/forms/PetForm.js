import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress  from '@mui/material/LinearProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/petForm.css";

const PetForm = ({
    handleChange,
    handleImage,
    handleImageRemove,
    preview,
    pets,
    uploading,
    progress,
    uploadButtonVideo, 
    handleVideo,
    handleVideoRemove,
    handleSubmit,
    video,
}) => {
    return (
            <div id="formScreen">
                <ToastContainer />
                <h2>Your pet details</h2>
                <div id="centerContainer">  
                    <form id="formAddPet" onSubmit={handleSubmit}>
                        <div id="fContainer">
                            <div className="column">
                                <label>Pet Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    id="name"
                                    onChange={handleChange} 
                                    required
                                />  
                                    
                                <label>Type:</label>   
                                <select
                                    id="type"
                                    onChange={handleChange}
                                    required
                                >
                                        <option>Dog</option>
                                        <option>Cat</option>
                                </select>

                                <label>Breed</label>
                                <input 
                                    type="text" 
                                    placeholder="Breed" 
                                    id="breed"
                                    onChange={handleChange} 
                                    required
                                />

                                <label>Gender:</label>
                                <select>
                                    <option>Male</option>
                                </select>

                                <label>Age:</label>
                                <input 
                                    type= "number"
                                    placeholder="Age" 
                                    id="age"
                                    onChange={handleChange} 
                                    required
                                />
                                    
                                <label>Origin:</label>
                                <input 
                                    type= "text"
                                    placeholder="Origin" 
                                    id="origin"
                                    onChange={handleChange} 
                                    required
                                />
                                    
                                <label>Colour:</label>
                                <input 
                                    type= "text"
                                    placeholder="Colour" 
                                    id="colour"
                                    onChange={handleChange} 
                                    required
                                />
                                    
                                <label>Pet Description:</label>
                                <textarea
                                    cols="7" 
                                    rows="10" 
                                    id="description"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="column">
                                <label>Price:</label>
                                <input 
                                    type= "number"
                                    placeholder="Price" 
                                    id="price"
                                    onChange={handleChange} 
                                    required
                                />
                                    
                                <label>Licence Number:</label>
                                <input 
                                    type= "text"
                                    placeholder="Licence" 
                                    id="licence"
                                    onChange={handleChange} 
                                    required
                                />

                                <label>Vaccinated:</label>   
                                <select
                                    id="vaccinated"
                                    onChange={handleChange}
                                    required
                                    >
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                                
                                <div className="images">
                                    <label>
                                        Add Images:
                                    </label>
                                    <br />
                                    <input 
                                        type="file"  
                                        id="images" 
                                        name="images"
                                        multiple
                                        onChange={handleImage} 
                                        accept="image/*" 
                                        required
                                        // hidden 
                                    />   
                                        
                                    <ImageList>
                                        {preview.map((image, index) => { 
                                            return (
                                                <ImageListItem key={index} sx={{margin: 1}}>
                                                <IconButton
                                                sx={{ color: 'black' }}
                                                aria-label={`delete ${image}`}
                                                onClick={() => handleImageRemove(image)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <img
                                                    src={image}
                                                    srcSet={`${image}?w=500&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={image}
                                                    loading="lazy"
                                                    sx={{ width: 100, height: 100 }}
                                                    />
                                            </ImageListItem>
                                        )})
                                    }
                                    </ImageList> 
                                </div>
                                    
                                <div className="video">
                                    <label >
                                        {uploadButtonVideo}
                                        <input onChange={handleVideo} type="file" accept="video/*" hidden />
                                    </label>

                                    {!uploading && video.Location && (
                                        <Tooltip title="Delete">
                                        <span onClick={handleVideoRemove}>
                                            <DeleteIcon />  {/* to remove the video*/}
                                        </span>
                                    </Tooltip>
                                    )}
                                    {progress > 0 && (
                                        <LinearProgress 
                                        variant="determinate"
                                        value={progress} 
                                        />
                                        )}
                                </div>    
                            </div>
                        </div>
                        <div className="saveButton">
                            <Button 
                            onClick={handleSubmit} 
                            disabled={pets.loading || pets.uploading}
                            className="btn btn-primary"
                            loading={pets.loading}
                            type="submit"
                            size="large"
                            shape="round"
                            >
                                {pets.loading ? ('Saving...') : ('Save & Continue')}
                            </Button>        
                        </div> 
                    </form>   
                </div>
            </div>   
    );
};

export default PetForm;