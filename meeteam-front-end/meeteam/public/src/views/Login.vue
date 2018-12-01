<template>
  <div class="row">
    <br>
    <br>
    <div class="col s12 m6 offset-m3 l4 offset-l4 LoginContainer" style="padding: 30px !important">
      <div class="row">
        <div>
          <div class="LoginTitle defaultTextColor">{{Settings.AppSettings.AppName}}</div>
        </div>
      </div>
      <div class="row">
        <div>
          <div
            class="Styletto rounded medium topMargin iconed alpha75"
            style="background-color: #f7f7f7;"
          >
            <i class="fa fa-user"></i>
            <input type="text" name="Username" placeholder="Usuario">
          </div>

          <div
            class="Styletto rounded medium topMargin iconed alpha75"
            style="background-color: #f7f7f7;"
          >
            <i class="fa fa-key"></i>
            <input type="password" name="Password" placeholder="Clave">
          </div>

          <button
            class="Styletto rounded topMargin defaultColor textWhite animateCubic medium right shadowed"
            id="Login"
          >Iniciar Sesion</button>
        </div>
      </div>
      <div class="row">
        <div>
          <a
            href="#Forgot.html"
            class="Styletto button rounded topMargin defaultTextColor medium animateCubic right shadowed waves-effect waves-defaultColor notRoundBottom"
          >Olvidaste tu clave?</a>
          <a
            href="#Register.html"
            class="Styletto button rounded notRoundTop defaultTextColor medium animateCubic right shadowed waves-effect waves-defaultColor"
          >Registrate</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "login",
  compontents: {}
};
</script>

<style>
@import "Style/BengalaFramework/Util/Styletto.css";

.LoginTitle {
  text-align: left;
  text-shadow: none;
  font-size: 30px;
}
</style>

