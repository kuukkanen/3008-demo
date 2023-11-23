(function () {
  madeby.textContent = "Joonas Kiuru"; // eslint-disable-line

  const element = `
        <!-- Image Section: Animals -->
        <hr class="solid">
        <h2>Animals</h2>
        <div>
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1280px-Cat_August_2010-4.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Retriever_in_water.jpg/1024px-Retriever_in_water.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bicho-pregui%C3%A7a_3.jpg/330px-Bicho-pregui%C3%A7a_3.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Domestic_llama_%282009-05-19%29.jpg/330px-Domestic_llama_%282009-05-19%29.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/20050323_-_Suricata_Suricatta_-_La_Barben_-_France.jpg/375px-20050323_-_Suricata_Suricatta_-_La_Barben_-_France.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/American_bison_k5680-1.jpg/330px-American_bison_k5680-1.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/P.t.altaica_Tomak_Male.jpg/330px-P.t.altaica_Tomak_Male.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Atelopus_zeteki1.jpg/330px-Atelopus_zeteki1.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vulpes_vulpes_ssp_fulvus.jpg/330px-Vulpes_vulpes_ssp_fulvus.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Gemeine_Heidelibelle_%28Sympetrum_vulgatum%29_4.jpg/330px-Gemeine_Heidelibelle_%28Sympetrum_vulgatum%29_4.jpg">
        </div>
        <hr class="solid">
        <h2>Cars</h2>
        <div>
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/BMW_sixth-generation_7Series_in_Tokyo-MotorShow_2015.jpg/480px-BMW_sixth-generation_7Series_in_Tokyo-MotorShow_2015.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bmw_328.jpg/557px-Bmw_328.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Alfa_2000_touring_spider.JPG/375px-Alfa_2000_touring_spider.JPG">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Audi_A8_2013_%2811209850785%29.jpg/375px-Audi_A8_2013_%2811209850785%29.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Alfa_Romeo_33_1.3_VL_1991.jpg/375px-Alfa_Romeo_33_1.3_VL_1991.jpg">
        </div>
        <hr class="solid">
        <h2>Garfield</h2>
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/fi/thumb/4/43/Garfield.gif/375px-Garfield.gif">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/en/4/46/Garfieldand_friends.png">
        <img class="medium-image" src="https://static.wikia.nocookie.net/garfield/images/7/79/Garfield_Ecxo.png/revision/latest?cb=20110924014029">               
        <img class="medium-image" src="https://static.wikia.nocookie.net/garfield/images/c/c8/Self_esteem_%2801%29.png/revision/latest/scale-to-width-down/180?cb=20130508201839">
        <img class="medium-image" src="https://m.media-amazon.com/images/M/MV5BNzg1MWU2YjEtNTI2Zi00NDU4LTkxNGEtYWFlNDk2YTM3YjFkXkEyXkFqcGdeQXVyODk1MjAxNzQ@._V1_.jpg">
        <img class="medium-image" src="https://yt3.googleusercontent.com/ytc/APkrFKbQ7-BsYGRvZAtYGo27UtTZb51lf8pHc33Wa02CPg=s900-c-k-c0x00ffffff-no-rj">
        <img class="medium-image" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/06/19/09/garfield.jpg?width=1200&height=1200&fit=crop">

        <img class="medium-image" src="https://avatar.amuniversal.com/feature_avatars/recommendation_images/features/ga/large_rec-201701251556.jpg">
        <img class="medium-image" src="https://i.guim.co.uk/img/media/20a74d437c1ae0ef38c7c87d49e3d4db271b0cb3/569_167_2584_1550/master/2584.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=775be45f9af62070840c2740f3e6c555">
        <img class="medium-image" src="https://www.giantbomb.com/a/uploads/original/0/316/510127-garfield_anime_wallpaper.jpg">    
        
        <hr class="solid">
        <h2>Guitars</h2>
        
        
        <hr class="solid">`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line
})();
