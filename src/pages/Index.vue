
<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-10 col-xs-12 col-sm-8 col-xl-4">
        <div class="text-h3 q-my-xl text-center">QB.CX</div>
        <q-input outlined v-model="long_url" label="请输入网址" dense type="url">
          <template slot="after">
            <q-btn color="primary" @click="createShortUrl" :loading="loading">生成</q-btn>
          </template>
        </q-input>
        <div class="q-my-md" v-if="qrCodeUrlData !== '#'">
          <q-card class="my-card">
            <q-card-section :horizontal="horizontal">
              <q-card-section class="text-center" :style=" horizontal ? 'width:40%' : ''">
              <img :src="qrCodeUrlData" :style="'width:'+width+'px;'" />
              </q-card-section>
              <q-card-section :style=" horizontal ? 'width:60%' : ''">
                <div class="text-h6">{{data.full_short_url}}&nbsp;&nbsp;<q-btn icon="file_copy" size='xs' dense round  @click="copy"/></div>
                <div class="text-body2 q-mt-md" style="word-wrap:break-word;word-break:normal; ">{{data.long_url}}</div>
              </q-card-section>

            </q-card-section>
          </q-card>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { errorMsg, successMsg } from 'src/libs/utils'
import { createShortUrl } from 'src/services/web'
import { copyToClipboard } from 'quasar'
const QRCode = require('qrcode')

export default {
  name: 'index',
  data () {
    return {
      long_url: '',
      loading: false,
      qrCodeUrlData: '#',
      data: { full_short_url: '', long_url: '' },
      width: 256,
      horizontal: true
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
          this.data = res.data.data
          QRCode.toDataURL(this.data.full_short_url, {
            width: this.width,
            margin: 2,
            height: this.width
          }).then(raw => {
            this.qrCodeUrlData = raw
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    copy () {
      copyToClipboard(this.data.full_short_url).then(res => {
        successMsg('复制成功')
      })
    }
  },
  created () {
    if (this.$q.screen.width > 1438) {
      this.horizontal = true
    } else {
      this.horizontal = false
    }
  }
}
</script>
