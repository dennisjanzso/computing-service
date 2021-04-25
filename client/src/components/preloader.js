
function Preloader({progressInfo}) {

  return (
    <div>
      <div style={{display: 'block'}}>
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{display: 'block'}}>
        <small>{progressInfo}</small>
      </div>
    </div>
  );
}

export default Preloader;
