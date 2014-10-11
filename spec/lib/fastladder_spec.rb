require 'spec_helper'

describe :fastladder do

  describe 'Fastladder::Initializer' do
    context 'constants' do
      let(:fastladder) {Fastladder::Initializer.new }

      it 'changing HTTP_PROXY_EXCEPT_HOSTS' do
        fastladder.proxy_except_hosts = [/foo/, :bar, "buz"]
        expect(Fastladder::HTTP_PROXY_EXCEPT_HOSTS).to eq([/foo/])
      end

      it 'changing HTTP_OPEN_TIMEOUT' do
        fastladder.open_timeout = 100
        expect(Fastladder::HTTP_OPEN_TIMEOUT).to eq(100)
      end

      it 'changing HTTP_READ_TIMEOUT' do
        fastladder.read_timeout = 200
        expect(Fastladder::HTTP_READ_TIMEOUT).to eq(200)
      end

      it 'changing CRAWLER_USER_AGENT' do
        fastladder.crawler_user_agent = "YetAnother FeedFetcher/0.0.3 (http://example.com/)"
        expect(Fastladder::CRAWLER_USER_AGENT).to eq("YetAnother FeedFetcher/0.0.3 (http://example.com/)")
      end
    end
  end

end
