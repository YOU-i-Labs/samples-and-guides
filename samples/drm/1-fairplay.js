/**
 * Copyright (c) You i Labs Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { FairPlayDrmHandler, Video, Text } from '@youi/react-native-youi';
import base64 from 'base-64';

const FPS_CERTIFICATE_URI = 'https://fps.ezdrm.com/demo/video/eleisure.cer';
const FPS_LICENSE_SERVER_URI = 'https://fps.ezdrm.com/api/licenses/';
const FPS_VIDEO_SOURCE = {
  uri: 'https://fps.ezdrm.com/demo/video/ezdrm.m3u8',
  type: 'HLS',
  drmScheme: 'fairplay',
};

export class FairPlayVideo extends Component {
  contentIdentifier = '';

  videoRef = React.createRef();

  /**
   * Thin wrapper around XMLHttpRequest to make a fetch request with binary data
   * Necessary due to fetch arrayBuffer and text methods not working correctly
   *
   * @param {string} uri - URI to make the request to
   * @param {Object} options - Fetch-like options object
   * @param {(''|'get'|'post'|'put'|'delete')} options.method - Which method to make the request
   * @param {Object} options.body - request body
   *
   * @returns {Promise} Promise object represeting the result of the XMLHttpRequest
   */
  fetchBinary = (uri, options = { method: 'get', body: null }) => new Promise((resolve, reject) => {
    const { method, body } = options;
    const request = new XMLHttpRequest();
    request.open(method, uri, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        const arrayBuffer = request.response;
        let stringKey = '';
        if (arrayBuffer) {
          const byteArray = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteArray.byteLength; i++)
            stringKey += String.fromCharCode(byteArray[i]);
        const response = base64.encode(unescape(stringKey));
        resolve(response);
      } else
        reject(request.statusText);
      }
    };
    request.onerror = () => reject(request.statusText);
    request.send(body);
  });

  componentDidMount() {
    // Connect to event listeners to the FairPlayDrmHandler module.
    if (FairPlayDrmHandler) {
      FairPlayDrmHandler.addEventListener('DRM_REQUEST_URL_AVAILABLE', this.onFairplayDRMRequestUrlAvailable);
      FairPlayDrmHandler.addEventListener('SPC_MESSAGE_AVAILABLE', this.onFairplaySPCMessageAvailable);
    }
  }

  /**
   * Warm up the DRM request and initiate the SPC message request
   *
   * @param {Object} drmRequestArgs - DRM request arguments passed down from the player
   * @param {string} drmRequestArgs.drmRequestUrl - The URI from the HLS #EXT-X-KEY tag
   * @param {number} drmRequestArgs.tag - The Video component native ID
   *
   * @returns {undefined}
   */
  onFairplayDRMRequestUrlAvailable = async ({ drmRequestUrl, tag }) => {
    // drmRequestUrl is the URI found in the manifest. For example:
    // EXT-X-KEY:METHOD=SAMPLE-AES,URI="skd://drm",KEYFORMAT="com.apple.streamingkeydelivery"
    // This URI may have information necessary to playback, such as the content identifier
    // or license server URI
    // If these are not in the manifest, they are values from your CMS/DRM provider
     [, this.contentIdentifier] = drmRequestUrl.split(';');

    // Use the DRM Request URL to make whatever network requests required by your FairPlay DRM server,
    // to get the FairPlay certificate file and Content Identifier required to continue FairPlay authentication.
    // The implementation details here will depend on your DRM provider license server.
    try {
      const fpsCertificateString = await this.fetchBinary(FPS_CERTIFICATE_URI);
      FairPlayDrmHandler.requestSPCMessage(tag, fpsCertificateString, this.contentIdentifier);
    } catch (exception) {
      FairPlayDrmHandler.notifyFailure(tag);
    }
  }

  /**
   * Decode the SPC message and use it to retrieve the CKC message from the FairPlay license server
   *
   * @param {Object} spcMessageArgs - DRM request arguments passed down from the player
   * @param {string} drmRequestArgs.spcMessage - The SPC message, encoded as a base64 string
   * @param {number} drmRequestArgs.tag - The Video component native ID
   *
   * @returns {undefined}
   */
  onFairplaySPCMessageAvailable = async ({ tag, spcMessage }) => {
    const decodedSpcMessage = base64.decode(spcMessage);

    // Use the SPC Message to make whatever network requests required by your FairPlay DRM server,
    // to get the CKC Message required to continue FairPlay authentication.
    // The implementation details here will depend on your DRM provider license server.
    try {
      const ckcMessage = await this.fetchBinary(FPS_LICENSE_SERVER_URI + this.contentIdentifier, {
        method: 'post',
        body: decodedSpcMessage,
      });
      FairPlayDrmHandler.provideCKCMessage(tag, ckcMessage);
    } catch (exception) {
      FairPlayDrmHandler.notifyFailure(tag);
    }
  }

  render() {
    if (!FairPlayDrmHandler) {
      return <Text style={{ fontSize: 26, color: 'white' }}>
        FairPlayDrmHandler is undefined, and requires to be added to the React Bridge
      </Text>;
    }

    return <Video
      style={{ height: '100%', width: '100%' }}
      ref={this.videoRef}
      source={FPS_VIDEO_SOURCE}
      onReady={() => this.videoRef.current.play()}
    />;
  }
}
