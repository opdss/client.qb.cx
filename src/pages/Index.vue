<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-4 col-xs-12 col-sm-6 col-xl-3">
        <div class="text-h3 q-my-xl text-center">铅笔短网址</div>
        <q-input outlined v-model="long_url" label="请输入网址" dense type="url">
          <template slot="after">
            <q-btn color="primary" @click="createShortUrl" :loading="loading">生成</q-btn>
          </template>
        </q-input>
        <div class="q-my-md" v-if="qrCodeUrlData !== '#'">
          <q-card>
            <img :src="qrCodeUrlData" />

            <q-card-section>
              <div class="text-h6">{{data.full_short_url}}</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section class="q-pt-none">{{data.long_url}}</q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { errorMsg } from 'src/libs/utils'
import { createShortUrl } from 'src/services/web'
const QRCode = require('qrcode')
export default {
  name: 'index',
  data () {
    return {
      long_url: '',
      loading: false,
      qrCodeUrlData: '#',
      data: { full_short_url: '', long_url: '' }
    }
  },
  methods: {
    createShortUrl () {
      this.loading = true
      if (!this.long_url) {
        errorMsg('请输入正确的跳转地址！')
        this.loading = false
        return
      }
      createShortUrl({ long_url: this.long_url })
        .then(res => {
          QRCode.toDataURL(res.data.short_url).then((raw) => {
            this.qrCodeUrlData = raw
          })
          this.data = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          errorMsg('网络好像不太好，请稍后再试！')
        })
    }
  }
}
</script>
