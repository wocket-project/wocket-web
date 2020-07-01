<template>
    <button type="button" class="donwload-excel-btn" @click="downloadExcel()">구매내역 다운로드</button>
</template>
<script>
import axios from "axios"

export default {
    methods: {
        downloadExcel: function() { 

            let token = localStorage.getItem("accessToken")

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
            .get("http://localhost:9306/downloadExcelFile/purchaseHistory.xlsx", config, {
                responseType: 'blob',
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', '구매내역.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.log(error)
            })
        }
    }    
}
</script>
<style>
.donwload-excel-btn {
  background-color: #29a724;  
  width: 150px;
  float: right;
  margin-top: 4%;
  border: none;
  color: #FFF;
  text-align: center;
  display: inline-block;
  font-size: 90%;  
  padding: 5px;
  cursor: pointer;
}
</style>
