require 'spec_helper'

describe Fastladder do
  let(:fastladder) { described_class }

  it 'changes http_proxy_except_hosts' do
    fastladder.proxy_except_hosts = [/foo/, :bar, "buz"]
    expect(Fastladder.http_proxy_except_hosts).to eq([/foo/])
  end

  it 'changes http_open_timeout' do
    fastladder.open_timeout = 100
    expect(Fastladder.http_open_timeout).to eq(100)
  end

  it 'changes http_read_timeout' do
    fastladder.read_timeout = 200
    expect(Fastladder.http_read_timeout).to eq(200)
  end

  it 'changes crawler_user_agent' do
    fastladder.crawler_user_agent = "YetAnother FeedFetcher/0.0.3 (http://example.com/)"
    expect(Fastladder.crawler_user_agent).to eq("YetAnother FeedFetcher/0.0.3 (http://example.com/)")
  end
end
