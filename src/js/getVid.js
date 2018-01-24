function vid(){
    let id = vid.id || 0; 

    vid.id = id + 1; 

    return id;
}

module.exports = vid; 
