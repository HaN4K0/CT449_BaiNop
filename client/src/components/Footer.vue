<template>
    <footer class="footer bg-dark text-light py-3">
      <div class="container text-center">
        <p>&copy; {{ currentYear }} Thư Viện Online. All Rights Reserved.</p>
        <div>
          <a href="#" class="text-light mx-2"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-light mx-2"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-light mx-2"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  .footer {
    position: relative;
    width: 100%;
    bottom: 0;
  }
  </style>
  