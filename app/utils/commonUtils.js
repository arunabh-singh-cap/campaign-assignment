import reduce from 'lodash/reduce';
import get from 'lodash/get';
import pick from 'lodash/pick';
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import moment from 'moment-timezone';
import * as constants from '../components/pages/App/constants';

const { MOBILEPUSH, ANDROID, IOS, SMS, EMAIL, WECHAT } = constants;

export const parseQueryParams = (url = '') => {
  const queryString = url.split('?')[1] || '';
  const queryParams = queryString.split('&') || [];
  const queryParamsObject = {};
  queryParams.forEach(queryParam => {
    const keyValue = queryParam.split('=') || [];
    const key = keyValue[0];
    const value = keyValue[1];
    queryParamsObject[key] = value;
  });

  return queryParamsObject;
};

export const getContentChannels = (messageContents, mpushSubType = false) =>
  reduce(
    messageContents,
    (addedChannel, channelContent) => {
      if (
        get(channelContent, 'channel') &&
        !addedChannel.includes(channelContent.channel)
      ) {
        if (channelContent.channel === MOBILEPUSH && mpushSubType) {
          const { androidContent, iosContent } = channelContent;
          if (androidContent) {
            addedChannel.push(ANDROID);
          }
          if (iosContent) {
            addedChannel.push(IOS);
          }
        } else {
          addedChannel.push(channelContent.channel);
        }
      }
      return addedChannel;
    },
    [],
  );

export const filterChannelContent = (messageContent = {}) => {
  let filteredKeys = [];
  for (let key in messageContent) {
    if (messageContent[key] && messageContent[key].channel) {
      filteredKeys.push(key);
    }
  }
  return pick(messageContent, filteredKeys);
};

export const prepareWeChatMappedPreviewData = (
  content,
  templateTags,
  tagData,
) => {
  let formattedContent = decodeURIComponent(cloneDeep(content));
  forEach(templateTags, tag => {
    if (tagData[tag].value !== undefined) {
      formattedContent = formattedContent.replace(
        `{{${tag}.DATA}}`,
        tagData[tag].value,
      );
    }
  });
  return formattedContent;
};

export const getWeChatData = content => {
  let data;
  try {
    data = JSON.parse(
      JSON.parse(unescape(decodeURI(JSON.parse(content)))).replace(/\\/g, ''),
    );
  } catch (err) {
    console.log(err);
  }
  return data;
};

/*
* This method gives a concatinated content of mobilePush content.
* The concatinated content includes title and message of Android and IOS content
*/
export const getMobilePushContent = ({
  messageContent: { androidContent, iosContent } = {},
}) => `
    ${get(androidContent, 'title', '')}
    ${get(androidContent, 'message', '')}
    ${get(iosContent, 'title', '')}
    ${get(iosContent, 'message', '')}
  `;

export const getContentBody = (messageContent = {}) => {
  const { channel } = messageContent;
  switch (channel) {
    case SMS:
      return messageContent.messageBody;
    case EMAIL:
      return messageContent.emailBody;
    case MOBILEPUSH:
      return getMobilePushContent(messageContent);
    case WECHAT: {
      const messageBody = JSON.parse(messageContent.messageBody);
      const weChatContent = messageBody.data;
      const isRichmediaTemplate = get(
        weChatContent,
        'definition.msgcontent',
        false,
      );
      const { content, Tag, data } = messageBody;
      if (isRichmediaTemplate) {
        return '';
      } else {
        return prepareWeChatMappedPreviewData(content, Tag, data);
      }
    }
    default:
      return '';
  }
};

export const formatMessageHandler = (formatMessage, id, fallback) => {
  try {
    return formatMessage(id);
  } catch (err) {
    return fallback;
  }
};

export const getEpochTimeStamp = ({
  timezone,
  date,
  withMilliSeconds = true,
} = {}) => {
  let method = 'valueOf'; // Unix time in milliseconds: http://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/
  if (!withMilliSeconds) {
    method = 'unix'; // unix time in seconds: http://momentjs.com/docs/#/displaying/unix-timestamp/
  }
  if (timezone) {
    return (
      moment(date)
        .tz(timezone)
        // eslint-disable-next-line no-unexpected-multiline
        [method]()
    );
  } else {
    return moment(date)[method]();
  }
};
