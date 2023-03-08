import { XMLParser } from 'fast-xml-parser';
import { parseDescriptionFromFeed } from '../utils/ParseRssFeed';

jest.mock('fast-xml-parser');

describe('parseDescriptionFromFeed', () => {
  beforeEach(() => {
    XMLParser.mockClear();
  });

  it('parses the feed description correctly', async () => {
    const feedUrl = 'https://example.com/feed.xml';
    const mockParsedXml = {
      rss: {
        channel: {
          description: 'This is a test RSS feed',
        },
      },
    };
    XMLParser.prototype.parse.mockReturnValue(mockParsedXml);

    const description = await parseDescriptionFromFeed(feedUrl);

    expect(XMLParser).toHaveBeenCalledTimes(1);
    expect(XMLParser).toHaveBeenCalledWith();
    expect(description).toEqual(mockParsedXml.rss.channel.description);
  });

  it('throws an error if the XML parser throws an error', async () => {
    const feedUrl = 'https://example.com/feed.xml';
    XMLParser.prototype.parse.mockImplementationOnce(() => {
      throw new Error('XML parser error');
    });

    await expect(parseDescriptionFromFeed(feedUrl)).rejects.toThrow(
      'XML parser error'
    );
  });
});
