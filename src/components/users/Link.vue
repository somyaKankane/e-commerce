<template>
    <div class="link container">
        <h1>About us</h1>
        <div class="container">
  <form>
      <div class="mb-3">
        <label for="fname" class="form-label">First Name</label>
        <input type="text" id="fname" class="form-control form-control-color" name="firstname" placeholder="Your name..">
      </div>
      <div class="mb-3">
        <label for="lname" class="form-label">Last Name</label>
        <input type="text" id="lname" class="form-control form-control-color" name="lastname" placeholder="Your last name..">
      </div>
    <!-- <label for="country" class="form-label">Country</label>
    <select id="country" name="country">
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
      <option value="usa">USA</option>
    </select> -->
    <div class="mb-3">
        <label for="subject" class="form-label">Subject</label>
        <textarea id="subject" name="subject" class="form-control form-control-color" placeholder="Write something.." style="height:200px"></textarea>
    </div>
     <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
    </div>
</template>

<script>
  export default {

  }
</script>
